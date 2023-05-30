const productController = require('../Controllers/productController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',upload.array("files"),productController.addProduct)

//get single Product
router.post('/get_singleproduct',authoriseJwt,productController.getSinlgeProduct)

//get all Product
router.post('/get_products',authoriseJwt,productController.getProducts)


module.exports = router