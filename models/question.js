const mongoose = require('mongoose');
const connection = require('../config/db');

const questionSchema = mongoose.Schema({
    userEmail: String,
    title: String,
    description: String,
    tags: [String],
    answers: [String],
    userAnswered: [String]
})


const Question = connection.model('Question', questionSchema)

module.exports = Question