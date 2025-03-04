const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const path = require('path')
const publicPath = path.join(__dirname, '/public')

const app = express();
const port = process.env.PORT || 8080



app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))

app.use(
  session({
    secret: 'hghtyNN23hbd54dstkhj2342asdfa3689jhf',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

const apiRoutes = require('./routes/api.js')
const pagesRoutes = require('./routes/pages.js')

app.use('/', apiRoutes)
app.use('/', pagesRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));