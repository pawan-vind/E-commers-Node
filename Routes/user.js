const express = require('express')
const { fetchUserById, updateUser } = require('../controllers/userCtrl')
const router = express.Router()

router.get('/own', fetchUserById)
      .patch('/:id', updateUser)


exports.router = router