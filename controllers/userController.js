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
          return res.redirect('/home')
        })
    })(req,res, next)
}

module.exports.register = async function (req, res){
    try{
        console.log(req.body)
        let user = await db.findUserByLogin(req.body.login)
        if (!user) {
          let user = await db.addUser({token: req.body.login, name : req.body.login, login: req.body.login, password: req.body.password})
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
  let questionData = {userLogin: req.user._id, title: req.body.title, description: req.body.description}
  let question = await db.addQuestion(questionData)
  await db.addQuestionToUser(req.user._id, question._id)
  res.redirect('/home')
}

module.exports.showQuestions = async function (){
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

module.exports.allAnswers = async function(req, res) {
  let id = req.url.slice(10,34)
  let question = await db.findQuestionById(id)
  let Ans = []
  for(let id of question.answers){
      let ans = await db.findAnswerById(id)
      Ans.push({answer : ans.answer, score: ans.score, id: ans._id})
  }
  return {Question : question, Ans : Ans}
}

module.exports.answer = async function (req,res){
  let id = req.url.slice(8)
  let answerData = {answer : req.body.description , question: id, score: 0}
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