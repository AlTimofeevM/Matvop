const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')
const passport = require('./config/passport')

const frontendPath = path.join(__dirname, '../frontend')
const port = 8080

const app = express()

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(frontendPath, '/public')))

app.use(
    session({
        secret: 'd41d8cd98f00b204e9800998ecf8427e',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60*60*1000
        },
        resave: false,
        saveUnitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

const apiRoutes = require('./routes/api.js')
const pagesRoutes = require('./routes/pages.js')

app.use('/', apiRoutes  )
app.use('/', pagesRoutes)

app.listen(port, () => console.log('Example app listening on port ' + port))