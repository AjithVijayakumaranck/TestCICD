const  router = require('express').Router()
const filter_controller = require('../Controllers/filter_controller')
 
//api to get Cordinate from Place name
router.get('/get_location',filter_controller.get_locations)


//api to get location from coordinates
router.get('/get_revlocation',filter_controller.get_Revlocations)


//products with in a polygon
router.get('/filterproducts',filter_controller.getFiltered)
 

//products with in a distance
router.get('/filter_by_distance',filter_controller.filterDistance)


//search Management Routes

router.post('/search_products',filter_controller.searchProducts)


module.exports = router