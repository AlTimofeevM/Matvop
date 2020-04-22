const path = require('path')
const passport = require(path.join(__dirname, '../config/passport'))
const db = require('./dbController')


module.exports.login = function(req,res,next){
    passport.authenticate('local', function(err, user) {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.send('Укажите правильный логин или пароль!')
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err)
          }
          return res.redirect('back')
        })
    })(req,res, next)
}

module.exports.register = async function (req, res){
    try{
        console.log(req.body)
        let user = await db.findUserByEmail(req.body.email)
        if (!user) {
          let date = new Date()
          let user = await db.addUser({token: req.body.username, name : req.body.username, email: req.body.email, password: req.body.password, registrationDate: date})
          console.log(user)
          req.logIn(user, function(err) {
            if (err) {
              return next(err)
            }
            return res.redirect('/home')
          })
        }else{
          res.send("Такой пользователь уже зарегистрирован")
        }
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.ask = async function (req,res){
  let date = new Date()
  let questionData = {userId: req.user._id, title: req.body.title, description: req.body.description,creationDate:date, tags:req.body.tags.split(',')}
  let question = await db.addQuestion(questionData)
  await db.addQuestionToUser(req.user._id, question._id)
  res.redirect('/home')
}

module.exports.showQuestions = async function (req,res){
  let Quests = await db.allQuestions()
  return Quests
} 

module.exports.allAuthAnswers = async function(req, res) {
  let id = req.url.slice(10,34)
  let question = await db.findQuestionById(id)
  let Ans = []
  for(let id of question.answers){
      let ans = await db.findAnswerById(id)
      let isScored = await db.userIsScored(req.user._id, id)
      Ans.push({answer : ans.answer, score: ans.score, id: ans._id, isScored: isScored})
  }
  return {Question : question, Ans : Ans}
}

module.exports.userProfile = async function(req,res) {
  let token = req.url.slice(6)
  let User = await db.findUserByToken(token)
  let Profile = {username : User.token, email: User.email}
  let Questions = []
  for(let id of User.questions){
    let question = await db.findQuestionById(id)
    Questions.push(question)
  }
  return {Profile :Profile, Questions:  Questions};
}

module.exports.allAnswers = async function(req, res) {
  let id = req.url.slice(10,34)
  let question = await db.findQuestionById(id)
  let Ans = []
  for(let id of question.answers){
      let ans = await db.findAnswerById(id)
      Ans.push({answer : ans.answer, score: ans.score, id: ans._id})
  }
  console.log(question)
  return {Question : question, Ans : Ans}
}

module.exports.answer = async function (req,res){
  let date = new Date()
  let id = req.url.slice(8)
  let answerData = {answer : req.body.description , question: id, score: 0,creationDate:date}
  console.log(answerData)
  let answer = await db.addAnswer(answerData)
  await db.addAnswerToQuestion(id,answer._id)
  await db.userAnswered(req.user._id, id)
  res.redirect('/question/' + id)
}

module.exports.upscore = async function(req,res){
  let id = req.url.slice(9)
  await db.incAnsScore(id)
  await db.userScored(req.user._id, id)
  res.redirect('back')
}

module.exports.downscore = async function(req,res){
  let id = req.url.slice(11)
  await db.decAnsScore(id)
  await db.userScored(req.user._id, id)
  res.redirect('back')
}

module.exports.findQuestion =  function(req, res) {
  let text = encodeURI(req.body.text)
  res.redirect('question=' +  text)
}

module.exports.searchQuestion = async function(text) {
  return await db.findQuestions(text)
}

module.exports.findUserByUsername = async function(username){
  return await db.findUserByUsername(username)
}

module.exports.findUserByToken = async function(username){
  return await db.findUserByToken(username)
}

module.exports.info = async function(){
  let arr = []
  let users = await db.allUsers()
  for(user1 of users){
    for(q of user1.questions){
      let question = await db.findQuestionById(q) 
      for(user2 of question.userAnswered) {
          arr.push([user1.token, (await db.findUserById(user2)).token])
          console.log(arr)
      }
    }
  }
  return {Info : arr}
}