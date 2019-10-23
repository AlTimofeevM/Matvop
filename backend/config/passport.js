const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../controllers/dbController')

passport.use(
  new LocalStrategy(async function (username, password, done){
    try{
        const user = await db.findUserByName(username)
        if(!user || user.Password){
          return done(null, false, {
            errors: {'login or password': 'is invalid'}
          })
        }else{
          console.log('True')
          return done(null, user)
        }
    }catch(err){
      return done(err);
    }
  })
)


passport.serializeUser(function (user, done){
  console.log('Serializing', user)
  done(null, user._id)
})

passport.deserializeUser(async function (id, done){
  console.log('Deserializing', id)
  try{
    const User = await db.findUserById(id)
    if(!User) {
      return done(null, false)
    }
    else{
      return done(null, User)
    }
  }
  catch(err){
    return done(err)
  }
})

module.exports = passport