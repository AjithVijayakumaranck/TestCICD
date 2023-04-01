const productController = require('../Controllers/productController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add products route
router.post('/addproduct',upload.array("files"),authoriseJwt,productController.addProduct)

module.exports = router