const router = require('express').Router();

const productController = require('../../Controllers/productController');
const { authoriseJwt } = require('../../utilities/authorisation');
const upload = require('../../utilities/multer');


//add products route
router.post('/addproduct',authoriseJwt,upload.array("files"),productController.addProduct)

//get single Product
router.get('/get_singleproduct',authoriseJwt,productController.getSinlgeProduct)

//get all Product
router.get('/get_products',authoriseJwt,productController.getProducts)

//block product
router.delete('/delete_product/:productId',authoriseJwt,productController.blockProducts)

//get products of specific user
router.get('/get_userproducts/:userId',authoriseJwt,productController.getUserProduct)


module.exports = router;
