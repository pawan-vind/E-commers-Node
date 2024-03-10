const express = require('express');
const { fetchCategory, createcategory } = require('../controllers/categoryctrl');
const router = express.Router()

router.get('/', fetchCategory).post('/', createcategory) 

exports.router = router