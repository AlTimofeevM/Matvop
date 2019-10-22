const mongoose = require('mongoose');
const connection = require('../config/db');

const userSchema = mongoose.Schema({
    Token: String,
    Name: String,
    Login: String,
    Password: String,
    Questions:[String],
    Answers:[String]
})