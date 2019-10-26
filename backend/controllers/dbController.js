const UserModel = require('../models/user.js')

exports.findUserById = function (id) {
    return UserModel.findById(id)
}


exports.userLogin =  function(login, password, done) {
    UserModel.findOne({ login : login }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect login.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }

exports.addUser = function (userData) {
    return UserModel.create(userData);
}