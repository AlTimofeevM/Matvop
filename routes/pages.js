const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')
const userController = require('../controllers/userController')
const passport = require('passport');

router.get('/googlec8446466409abdb6.html', (req,res)=> {
  res.render('index1')
})

router.get('/', (req,res)=> {
    res.redirect('/home');
})

router.get('/home',async function(req, res){
    if(req.isAuthenticated()){
        res.render('indexAuth', {Quests : await userController.showQuestions()})
    }else{
        res.render('index', {Quests : await userController.showQuestions()})
    }
})

router.get('/ask', (req,res) => {
    res.render('question')
})

router.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
  })

  router.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  })

  router.get('/auth/odnoklassniki',
  passport.authenticate('odnoklassniki'),
  function(req, res){
    // The request will be redirected to Odnoklassniki for authentication, so
    // this function will not be called.
  });

router.get('/auth/odnoklassniki/callback',
  passport.authenticate('odnoklassniki', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  router.get('/auth/yandex',
  passport.authenticate('yandex'),
  function(req, res){
  });

router.get('/auth/yandex/callback', 
  passport.authenticate('yandex', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

  router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/question/*', async (req,res)=>{
    res.render('answer', {data : await userController.allAnswers(req.url)})
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home');
});

module.exports = router