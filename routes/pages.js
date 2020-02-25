const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')
const userController = require('../controllers/userController')
const passport = require('passport');

router.get('/', (req,res)=> {
    res.redirect('/home');
})

router.get('/home', async function(req, res){
  let user =  typeof req.user == "undefined" ? "qqq" : req.user.token
  res.render('index', {user :user ? "unknown" : req.user.token, Quests : await userController.showQuestions(), isAuth : req.isAuthenticated()})
})

router.get('/user/*', async (req,res)=>{
  let user = await userController.findUserByToken(req.url.slice(6))
  if(!user){
    res.render("404")
  }else{
    res.render("profile",{isAuth : req.isAuthenticated(), User : await userController.userProfile(req,res)})
  }
})

router.get('/question=*',async function(req, res){
  let text = decodeURI(req.url.slice(10))
  res.render('searchQuestion', {Quests : await userController.searchQuestion(text),  isAuth : req.isAuthenticated()})
})

router.get('/ask', (req,res) => {
  if(req.isAuthenticated()){
    res.render('question', {isAuth : req.isAuthenticated()})
  }else{
    res.render('404')
  }
})

router.get('/question/*', async (req,res)=>{
    res.render('answer', {data : await userController.allAnswers(req, res), isAuth : req.isAuthenticated()})
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('back');
});


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

router.get('/*', (req,res)=> {
  res.render("404")
})

module.exports = router