const UserModel = require('../models/user.js')


exports.findUserById = function (id) {
    return UserModel.findById(id)
}

exports.isUser = function(token) {
    return UserModel.findOne({Token: token}, function(err, user){
        if(err){
            return res.send('Error')
        }

        if(!user){
            return false
        }

        return true
    })
}