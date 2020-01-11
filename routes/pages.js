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
    if(req.isAuthenticated()){
        res.render('indexAuth', {Quests : await userController.showQuestions(), user : req.user.token})
    }else{
        res.render('index', {Quests : await userController.showQuestions()})
    }
})

router.get('/user/*', async (req,res)=>{
  let user = await userController.findUserByToken(req.url.slice(6))
  if(!user){
    res.render("404")
  }else{
    if(req.isAuthenticated){
      if(user.token === req.user.token){
        res.render("userPage",{user : req.user.token})
      }else{
        res.render("profile",{username: user.token, email: user.email})
      }
    }else{
      res.render("profile",{user:user})
    }
  }
})

router.get('/question=*',async function(req, res){
  let text = decodeURI(req.url.slice(10))
  if(req.isAuthenticated()){
      res.render('searchQuestionAuth', {Quests : await userController.searchQuestion(text)})
  }else{
      res.render('searchQuestion', {Quests : await userController.searchQuestion(text)})
  }
})

router.get('/ask', (req,res) => {
  if(req.isAuthenticated()){
    res.render('question')
  }else{
    res.redirect("404error404")
  }
})

router.get('/question/*', async (req,res)=>{
  if(req.isAuthenticated()){
    res.render('answerAuth', {data : await userController.allAuthAnswers(req, res),user : req.user.token})
  }else{
    res.render('answer', {data : await userController.allAnswers(req, res)})
  }  
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home');
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