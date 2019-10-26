const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'hghtyNN23h',
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