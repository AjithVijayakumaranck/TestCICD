const Category_subController = require('../Controllers/Category_subController')
const router = require('express').Router()

//CATEGORY MANAGING ROUTES

router.post('/add_category',Category_subController.addCategory) // add new category record

router.delete('/delete_category',Category_subController.deleteCategory) // delete existing category record

router.put('/update_category',Category_subController.updateCategory) // update existing category record


//subcategory MANAGING ROUTES

router.post('/add_subcategory',Category_subController.addSubcategory)   //add new record to subcategory collection

router.delete('/delete_subcategory',Category_subController.deleteSubCategory) //delete existing record from subcategory collection

router.put('/update_subcategory',Category_subController.updateSubcategory) //update existing record to subcategory collection

module.exports = router