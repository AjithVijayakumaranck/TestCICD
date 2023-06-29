const router = require('express').Router();

const subcriptionControllers = require('../Controllers/SuperAdmin/subscription_controller');
const { authoriseJwt } = require('../utilities/authorisation');


//decativate subscription
router.get('/get_subscription',subcriptionControllers.getSubscriptions)

//get single subscription
router.get('/get_singlesubscription/:subscriptionId',subcriptionControllers.getSubscription) 

module.exports = router;