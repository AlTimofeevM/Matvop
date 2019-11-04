const mongoose = require('mongoose');
const connection = require('../config/db');

const userSchema = mongoose.Schema({
    name: String,
    login: String,
    password: String,
    questions:[String],
    answers:[String]
})

const User = connection.model('User', userSchema)

module.exports = User