const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')

router.get('/', (req,res)=> {
    if(req.isAuthenticated()){
        res.send("Authenticated")
    }else{
        res.send("Not Authenticated")
    }
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(frontendPath,'/index.html'))
})

router.get('/login', (req,res)=>{
    res.sendFile(path.join(frontendPath,'/login.html'))
})

router.get('/register', (req,res)=>{
    res.sendFile(path.join(frontendPath,'/register.html'))
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router