const express = require('express')
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controllers/cartCtrl')
const { createOrders, fetchOrderByUser, deleteOrder, updateOrder, fetchAllOrders } = require('../controllers/orderCtrl')
const router = express.Router()

router.post('/', createOrders)
      .get('/own/', fetchOrderByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/', fetchAllOrders)



exports.router = router