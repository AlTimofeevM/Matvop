const path = require('path')
const passport = require(path.join(__dirname, '../config/passport'))
const db = require('./dbController')


module.exports.login = function(req,res,next){
    passport.authenticate('local', function (err, user) {
        console.log(user)
        if(err){
            return next(err)
        }
        if(!user){
            return res.redirect('/')
        }
        req.logIn(user, function(err){
            if(err){
                return next(err)
            }
            
            console.log(user)
            res.redirect('/home')
        })
    })(req,res, next)
}

module.exports.addUser = async function (req, res){
    try{
        console.log(req.body)
        await db.addUser(req.body)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}