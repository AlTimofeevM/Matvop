const mongoose = require('mongoose');
const connection = require('../config/db');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    registrationDate: Date,
    token: String,
    questions:[String],
    answers:[String]
})

const User = connection.model('User', userSchema)

module.exports = User