const productController = require('../Controllers/productController')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',upload.array("files"),productController.addProduct)

module.exports = router