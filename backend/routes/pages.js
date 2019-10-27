const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')

router.get('/', (req,res)=> {
    res.redirect('/home');
})

router.get('/home', (req, res) => {
    if(req.isAuthenticated()){
        res.sendFile(path.join(frontendPath,'/indexAuth.html'))
    }else{
        res.sendFile(path.join(frontendPath,'/index.html'))
    }

})

router.get('/ask', (req,res) => {
    res.sendFile(path.join(frontendPath, '/question.html'))
})

router.get('/login', (req,res)=>{
    res.sendFile(path.join(frontendPath,'/login.html'))
})

router.get('/register', (req,res)=>{
    res.sendFile(path.join(frontendPath,'/register.html'))
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/home');
});

module.exports = router