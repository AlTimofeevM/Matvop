const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../controllers/dbController')


passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user)
  done(null, user._id)
})

passport.deserializeUser(async function(id, done) {
  try{
    const user = await db.findUserById(id)
    if(!user) {
      return done(null, false)
    }
    else{
      return done(null, user)
    }
  }
  catch(err){
    return done(err)
  }
});

passport.use(
  new LocalStrategy({ usernameField: 'login' }, async function(login,password,done) {
    return await db.userLogin(login, password, done)
  })
)

module.exports = passport