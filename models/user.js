const mongoose = require('mongoose');
const connection = require('../config/db');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    registrationDate: Date,
    token: String,
    name: String,
    questions:[String],
    answers:[String]
})

const User = connection.model('User', userSchema)

module.exports = User