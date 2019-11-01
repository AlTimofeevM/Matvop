const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/ask', userController.ask)
router.post('/answer=*', userController.answer)
router.post('/upscore=*', userController.upscore)
router.post('/downscore=*', userController.downscore)

router.get('/qwerty', userController.showQuestions)
router.get('/question=*', userController.allAnswers)

module.exports = router