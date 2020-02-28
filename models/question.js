const mongoose = require('mongoose');
const connection = require('../config/db');

const questionSchema = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    creationDate: Date,
    tags: [String],
    answers: [String],
    userAnswered: [String]
})

questionSchema.index({ title: 'text' , tags: 'text', description: 'text'});

const Question = connection.model('Question', questionSchema)

module.exports = Question