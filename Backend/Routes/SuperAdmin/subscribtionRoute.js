const router = require('express').Router();

const subcriptionControllers = require('../../Controllers/SuperAdmin/subscription_controller')

//add subscription
router.post('/add_subscription',subcriptionControllers.addSubcription)
module.exports = router;