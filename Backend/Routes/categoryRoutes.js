const Category_subController = require('../Controllers/Category_subController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')
const router = require('express').Router()



//CATEGORY MANAGING ROUTES
router.get('/get_categories',Category_subController.getCategories)//get all document from category collection

router.get('/get_singlecategory',Category_subController.getSingleCategory) //get an single category document

router.post('/add_category',authoriseJwt,upload.single("file"),Category_subController.addCategory) // add new category record

router.delete('/delete_category',authoriseJwt,Category_subController.deleteCategory) // delete existing category record

router.put('/update_category',authoriseJwt,Category_subController.updateCategory) // update existing category record 


//subcategory MANAGING ROUTES
router.get('/get_singlesubcategory',Category_subController.getSingleSubcategory) //get an single subcategory document

router.post('/add_subcategory',authoriseJwt,Category_subController.addSubcategory)   //add new record to subcategory collection

router.delete('/delete_subcategory',authoriseJwt,Category_subController.deleteSubCategory) //delete existing record from subcategory collection

router.put('/update_subcategory',authoriseJwt,Category_subController.updateSubcategory) //update existing record to subcategory collection


s
module.exports = router