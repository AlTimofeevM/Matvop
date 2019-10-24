const mongoose = require('mongoose');
const connection = require('../config/db');

const userSchema = mongoose.Schema({
    Name: String,
    Login: String,
    Password: String,
    Questions:[String],
    Answers:[String]
})

const User = connection.model('User', userSchema)

module.exports = User