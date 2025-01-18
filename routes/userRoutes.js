const express =require('express')

const {SIGN_UP,LOG_IN} = require('../controllers/userController')

const router = express.Router()

router.post('/signup',SIGN_UP)
router.post('/login',LOG_IN)

module.exports = router