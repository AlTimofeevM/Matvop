const mongoose = require('mongoose');
const connection = require('../config/db');

const questionSchema = mongoose.Schema({
    userLogin: String,
    title: String,
    description: String,
    tags: [String],
    answers: [String]
})

const Question = connection.model('Question', questionSchema)

module.exports = Question