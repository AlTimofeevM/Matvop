const express = require('express')
const router = express.Router()
const path = require('path')
const frontendPath = path.join(__dirname, '../../frontend')

router.get('/', (req,res)=> res.redirect('/home'))

router.get('/home', (req, res) => {
    res.sendFile(path.join(frontendPath,'/index.html'))
})



module.exports = router