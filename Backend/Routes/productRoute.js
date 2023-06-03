const productController = require('../Controllers/productController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',upload.array("files"),productController.addProduct)

//get single Product
router.get('/get_singleproduct',authoriseJwt,productController.getSinlgeProduct)

//get all Product
router.get('/get_products',authoriseJwt,productController.getProducts)

//get specific userProduct
router.get('/get_user_products',authoriseJwt,productController.getUserProduct)


module.exports = router