const express = require('express')
const { fetchBrands, createBrands } = require('../controllers/brandCtrl')
const router = express.Router()

router.get('/', fetchBrands).post('/', createBrands)   

exports.router = router