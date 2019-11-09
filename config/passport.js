const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const VKontakteStrategy = require('passport-vkontakte').Strategy
const OdnoklassnikiStrategy = require('passport-odnoklassniki').Strategy
const db = require('../controllers/dbController')


const localStrategy = new LocalStrategy({ usernameField: 'login' }, async function(login,password,done) {
  return await db.userLogin(login, password, done)
})

const vkStrategy = new VKontakteStrategy({
  clientID:     7202672,
  clientSecret: "a8Bf5ICXHu9TKU9cSbNK",
  callbackURL:  "https://matvop.herokuapp.com/auth/vkontakte/callback"
},
function(accessToken, refreshToken, params, profile, done) {
  return db.vkAuth(accessToken, refreshToken, params, profile, done)
})

const odnoklassnikiStrategy = new OdnoklassnikiStrategy({
  clientID: 512000129587,
  clientPublic: "CEDLPGJGDIHBABABA",
  clientSecret: "DBBACFFAE8684518AFE4D923",
  callbackURL: "https://matvop.herokuapp.com/auth/odnoklassniki/callback"
},
function(accessToken, refreshToken, profile, done) {
  return db.odnoklassnikiAuth(accessToken, refreshToken, profile, done)
}
)

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user)
  done(null, user.token)
})

passport.deserializeUser(async function(token, done) {
  try{
    const user = await db.findUserByToken(token)
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

passport.use(localStrategy)
passport.use(vkStrategy)
passport.use(odnoklassnikiStrategy)

module.exports = passport