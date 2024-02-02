const productController = require('../Controllers/productController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',authoriseJwt,upload.array("files"),productController.addProduct)

//get single Product
router.get('/get_singleproduct',productController.getSinlgeProduct)

//get all Product
router.get('/get_products',productController.getProducts)

//get specific userProduct
router.get('/get_user_products/:userId',authoriseJwt,productController.getUserProduct)

//lastpage Status
router.get("/check_lastpage",productController.getLastPage)


module.exports = router