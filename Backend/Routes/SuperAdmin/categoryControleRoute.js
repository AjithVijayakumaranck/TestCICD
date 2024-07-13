const Category_subController = require('../../Controllers/Category_subController');
const { authoriseJwt } = require('../../utilities/authorisation');
const upload = require('../../utilities/multer');

const router = require('express').Router();

//CATEGORY MANAGING ROUTES
router.get('/get_categories',authoriseJwt,Category_subController.getCategories)//get all document from category collection

router.get('/get_singlecategory',authoriseJwt,Category_subController.getSingleCategory) //get an single category document

router.post('/add_category',authoriseJwt,upload.single('file'),Category_subController.addCategory) // add new category record

// router.post('/add_filter_test',Category_subController.addFilters) // add filter content test

router.post('/add_filter',authoriseJwt,Category_subController.addFilters) // add filter content

router.delete('/delete_category',authoriseJwt,Category_subController.deleteCategory) // delete existing category record

router.put('/update_category',authoriseJwt,upload.single('file'),Category_subController.updateCategory) // update existing category record 


//subcategory MANAGING ROUTES
router.get('/get_subcategory',authoriseJwt,Category_subController.getSubCategories) //get  entire subcategory documents

router.get('/get_singlesubcategory',authoriseJwt,Category_subController.getSingleSubcategory) //get an single subcategory document

router.post('/add_subcategory',authoriseJwt,Category_subController.addSubcategory)   //add new record to subcategory collection

router.post('/add_subcat_filter',authoriseJwt,Category_subController.addSubcatFilters) // add filter content

router.post('/add_subcat_filter_test',Category_subController.addSubcatFilters) // add filter content

router.delete('/delete_subcategory',authoriseJwt,Category_subController.deleteSubCategory) //delete existing record from subcategory collection

router.put('/update_subcategory',authoriseJwt,Category_subController.updateSubcategory) //update existing record to subcategory collection


//nested category
router.post('/add_nested',authoriseJwt,Category_subController.addNested)


module.exports = router;