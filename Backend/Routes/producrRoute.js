const productController = require('../Controllers/productController')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',productController.addProduct)

module.exports = router