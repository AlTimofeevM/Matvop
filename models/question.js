const mongoose = require('mongoose');
const connection = require('../config/db');
var textSearch = require('mongoose-text-search');

const questionSchema = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    creationDate: Date,
    tags: [String],
    answers: [String],
    userAnswered: [String]
})

questionSchema.plugin(textSearch);

questionSchema.index({ title: 'text' , tags: 'text', description: 'text'},{language : "russian"});

const Question = connection.model('Question', questionSchema)

module.exports = Question