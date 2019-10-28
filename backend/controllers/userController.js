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
        await db.addUser({name : req.body.login, login: req.body.login, password: req.body.password})
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.ask = async function (req,res){
  let questionData = {userLogin: req.user._id, title: req.body.title, description: req.body.description, tags: req.body.tags.split(",")}
  let question = await db.addQuestion(questionData);
  await db.addQuestionToUser(req.user._id, question._id)
  res.redirect('/home')
}

module.exports.showQuestions = async function (req,res){
  let Quests = []
  let Q = req.user.questions
  for(let id of Q){
    let quest = await db.findQuestionById(id)
    Quests.push(quest)
  }
  res.status(200).send({Quests : Quests})
} 