const express = require('express')
const { createUser, loginUser, checkAuth , resetPasswordRequest} = require('../controllers/AuthCtrl')
const passport = require('passport')
const router = express.Router()

router.post('/signUp', createUser)
       .post('/login', passport.authenticate('local'), loginUser)
       .get('/check',passport.authenticate('jwt'),  checkAuth)
       .post('/reset-password-request', resetPasswordRequest)

exports.router = router