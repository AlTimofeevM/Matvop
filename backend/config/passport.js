const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const db = require('../controllers/dbController')

var strategy = new Auth0Strategy(
    {
        donmain: '',
        clientID: '',
        clientSecret: '',
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || '/callback'
    },
    async function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      if(!await db.isUser(profile.id)){
        await db.createUser({Token: profile.id, FirstName : profile.name.givenName, LastName: profile.name.familyName, Time : 0})
      }
      return done(null, profile)
    }
)


passport.use(strategy)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport