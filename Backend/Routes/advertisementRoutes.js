const productController = require('../Controllers/productController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()
const {}= process.env



//add new advertisement
router.post('/add_new_adv',authoriseJwt,upload.array("files"),productController.addAdvertisement)


module.exports = router