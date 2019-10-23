const UserModel = require('../models/user.js')

exports.findUserById = function (id) {
    return UserModel.findById(id)
}

exports.findUserByName = function (userName){
    return UserModel.findOne({Name: userName})
}

exports.addUser = function (userData) {
    return UserModel.create(userData);
}




