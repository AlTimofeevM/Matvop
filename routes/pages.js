const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')
const userController = require('../controllers/userController')


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

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/register', (req,res)=>{
    res.render('register')
})

router.get('/question/*', async (req,res)=>{
    res.render('answer', {data : await userController.allAnswers(req.url)})
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home');
});

module.exports = router