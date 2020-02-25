const UserModel = require('../models/user')
const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')

exports.findUserById = function (id) {
  return UserModel.findById(id)
}

exports.findUserByToken = function (token) {
  return UserModel.findOne({token: token})
}

exports.findUserByUsername = function (username) {
  return UserModel.findOne({username: username})
}

exports.findUserByEmail = function (email) {
  return UserModel.findOne({email: email})
}

exports.addUser = function (userData) {
  return UserModel.create(userData)
}

exports.findQuestionById = function (id){
    return QuestionModel.findById(id)
}

exports.allQuestions = function(){
  return QuestionModel.find({})
}

exports.addQuestion = function (questionData) {
  return QuestionModel.create(questionData)
}

exports.addQuestionToUser = function(userId, questionId){
  return UserModel.findOneAndUpdate({_id:userId}, {$push : {questions: questionId}})
}


exports.addAnswer = function (answerData) {
  return AnswerModel.create(answerData)
}

exports.addAnswerToQuestion = function(questionId, answerId){
  return QuestionModel.findOneAndUpdate({_id:questionId}, {$push : {answers: answerId}})
}

exports.findAnswerById = function (id){
  return AnswerModel.findById(id)
}

exports.incAnsScore = function(id){
  return AnswerModel.findOneAndUpdate({ _id: id}, { $inc: { score : 1 } })
}

exports.decAnsScore = function(id) {
  return AnswerModel.findOneAndUpdate({ _id: id}, { $inc: { score : -1 } })
}

exports.isUserScored = function(id) {
  UserModel.findById(id , function(err, user) {
    if (err) { return false; }
    if (!user) {
      return false;
    }
    return true;
  });
}

exports.userAnswered = function(userId, questionId){
  return QuestionModel.findOneAndUpdate({_id : questionId}, {$push : {userAnswered: userId}})
}

exports.userScored = function(userId, answerId){
  return AnswerModel.findOneAndUpdate({_id : answerId}, {$push : {userScored: userId}})
}

exports.userIsScored = async function(userId, answerId){
  let answer = await AnswerModel.findById(answerId)
  if(answer.userScored.indexOf(userId) == -1 ){
    return false
  }
  return true
}

exports.userLogin =  function(email, password, done) {
  UserModel.findOne({ email : email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect login.' });
    }
    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}

exports.vkAuth = function(accessToken, refreshToken, params, profile, done) {
console.log(profile)
UserModel.findOne({ token: profile.id }, function(err, user) {
  if (err) { return done(err); }
  if (!user) {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    let date = new Date().toLocaleString('ru', options)
    let user = UserModel.create({token: profile.id, registrationDate: date})
  }
  return done(null, user);
})
}

exports.odnoklassnikiAuth = function(accessToken, refreshToken, profile, done) {
console.log(profile)
UserModel.findOne({ token: profile.id }, function(err, user) {
  if (err) { return done(err); }
  if (!user) {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    let date = new Date().toLocaleString('ru', options)
    let user = UserModel.create({token: profile.id, registrationDate: date})
  }
  return done(null, user);
})
}

exports.findQuestions = function(text){
  return QuestionModel.find({ $text: { $search: text } }, function(err, result) {
    if(err) console.log(err)
    console.log(result)
  })
}