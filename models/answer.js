const mongoose = require('mongoose');
const connection = require('../config/db');

const answerSchema = mongoose.Schema({
    userEmail: String,
    answer: String,
    creationDate: Date,
    score: Number,
    question: String,
    userScored: [String]
})

const Answer = connection.model('Answer', answerSchema)

module.exports = Answer