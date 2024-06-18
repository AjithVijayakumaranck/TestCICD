const Category_subController = require('../Controllers/Category_subController')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')
const router = require('express').Router()



//CATEGORY MANAGING ROUTES
router.get('/get_categories',Category_subController.getCategories)//get all document from category collection

router.get('/get_singlecategory',Category_subController.getSingleCategory) //get an single category document

// router.post('/add_category',authoriseJwt,upload.single("file"),Category_subController.addCategory) // add new category record //no access for enduser

// router.post('/add_filter',authoriseJwt,Category_subController.addFilters) // add filter inputs  //no access for enduser

// router.delete('/delete_category',authoriseJwt,Category_subController.deleteCategory) // delete existing category record  //no access for enduser

// router.put('/update_category',authoriseJwt,Category_subController.updateCategory) // update existing category record  //no access for enduser

router.put('/register_clicks',authoriseJwt,Category_subController.registerClicks) // register clicks for category popularity

router.put('/register_clicks_subcat',authoriseJwt,Category_subController.registerClicksSubcat) //register clicks for subcategory popularity


//subcategory MANAGING ROUTES
router.get('/get_subcategory',Category_subController.getSubCategories) //get  entire subcategory documents 

router.get('/get_singlesubcategory',Category_subController.getSingleSubcategory) //get an single subcategory document

// router.post('/add_subcategory',authoriseJwt,Category_subController.addSubcategory)   //add new record to subcategory collection   //no access for enduser

// router.delete('/delete_subcategory',authoriseJwt,Category_subController.deleteSubCategory) //delete existing record from subcategory collection //no access for enduser

// router.put('/update_subcategory',authoriseJwt,Category_subController.updateSubcategory) //update existing record to subcategory collection //no access for enduser


//nestedcategory



module.exports = router