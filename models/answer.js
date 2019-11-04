const mongoose = require('mongoose');
const connection = require('../config/db');

const answerSchema = mongoose.Schema({
    userLogin: String,
    answer: String,
    score: Number,
    question: String
})

const Answer = connection.model('Answer', answerSchema)

module.exports = Answer