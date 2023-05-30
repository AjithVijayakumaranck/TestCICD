const router = require('express').Router();

const productController = require('../../Controllers/productController');
const { authoriseJwt } = require('../../utilities/authorisation');
const upload = require('../../utilities/multer');


//add products route
router.post('/addproduct',upload.array("files"),productController.addProduct)

//get single Product
router.post('/get_singleproduct',authoriseJwt,productController.getSinlgeProduct)

//get all Product
router.post('/get_products',authoriseJwt,productController.getProducts)

//block product
router.put('/get_products/:productId',authoriseJwt,productController.blockProducts)


module.exports = router;
