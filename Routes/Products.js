const express = require('express')
const { createProduct, fetchAllProducts, fetchAllProductById, updateProduct } = require('../controllers/productCtrl')
const router = express.Router()

router.post('/', createProduct)
      .get('/', fetchAllProducts)
      .get('/:id', fetchAllProductById)
      .patch('/:id', updateProduct)


exports.router = router