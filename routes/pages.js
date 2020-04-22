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
    user = req.user.token
  }else{
    user = "unknown"
  }
  res.render('index', {user :user, Quests : await userController.showQuestions(), isAuth : req.isAuthenticated()})
})

router.get('/user/*', async (req,res)=>{
  let user = await userController.findUserByToken(req.url.slice(6))
  if(!user){
    res.render("404")
  }else{
    if(req.isAuthenticated()){
      user = req.user.token
    }else{
      user = "unknown"
    }
    res.render("profile",{user:user, isAuth : req.isAuthenticated(), User : await userController.userProfile(req,res)})
  }
})

router.get('/question=*',async function(req, res){
  let text = decodeURI(req.url.slice(10))
  if(req.isAuthenticated()){
    user = req.user.token
  }else{
    user = "unknown"
  }
  res.render('searchQuestion', {user:user, Quests : await userController.searchQuestion(text),  isAuth : req.isAuthenticated()})
})

router.get('/ask', (req,res) => {
  if(req.isAuthenticated()){
    if(req.isAuthenticated()){
      user = req.user.token
    }else{
      user = "unknown"
    }
    res.render('question', {user:user, isAuth : req.isAuthenticated()})
  }else{
    res.render('404')
  }
})

router.get('/question/*', async (req,res)=>{
  if(req.isAuthenticated()){
    user = req.user.token
  }else{
    user = "unknown"
  }
  res.render('answer', {user : user, data : await userController.allAnswers(req, res), isAuth : req.isAuthenticated()})
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
  
router.get('/info', async (req,res)=> {
  if(req.isAuthenticated()){
    user = req.user.token
  }else{
    user = "unknown"
  }
  res.render("info", {user : user, isAuth : req.isAuthenticated(), graph : (await userController.info()).Info })
})

router.get('/*', (req,res)=> {
  res.render("404")
})

module.exports = router


