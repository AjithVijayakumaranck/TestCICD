const  router = require('express').Router()
const filter_controller = require('../Controllers/filter_controller')

//api to get Cordinate from Place name
router.get('/get_location',filter_controller.get_locations)


//api to get location from coordinates
router.get('/get_location',filter_controller.get_Revlocations)


module.exports = router