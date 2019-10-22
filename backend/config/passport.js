const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const db = require('../controllers/dbController')

var strategy = new Auth0Strategy(
    {
        domain: 'auction.eu.auth0.com',
        clientID: 'i2agDAaSmI8TlJbYuaDcQOzMsCMfqK6g',
        clientSecret: 'oaC_6rIoLKOnlHFkCYSsrx_TtEqxBhD8WRIe00R1l8nf7ahnFrqgOzjoCWbta-ST',
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || '/callback'
    },
    async function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      if(!await db.isUser(profile.id)){
        await db.createUser({Token: profile.id})
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