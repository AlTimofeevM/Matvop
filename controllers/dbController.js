const UserModel = require('../models/user')
const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')

exports.findUserById = function (id) {
    return UserModel.findById(id)
}

exports.userLogin =  function(login, password, done) {
    UserModel.findOne({ login : login }, function(err, user) {
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

exports.decAnsScore = function(id){
  return AnswerModel.findOneAndUpdate({ _id: id}, { $inc: { score : -1 } })
}