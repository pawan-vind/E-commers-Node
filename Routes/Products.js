const express = require('express')
const { createProduct, fetchAllProducts, fetchAllProductById, updateProduct,uploadProductImages } = require('../controllers/productCtrl')
const router = express.Router()

router.post('/',uploadProductImages, createProduct)
      .get('/', fetchAllProducts)
      .get('/:id', fetchAllProductById)
      .patch('/:id', updateProduct)


exports.router = router