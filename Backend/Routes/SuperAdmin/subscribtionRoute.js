const router = require('express').Router();

const subcriptionControllers = require('../../Controllers/SuperAdmin/subscription_controller')

//add subscription
router.post('/add_subscription',subcriptionControllers.addSubcription)

//edit subscription plan
router.put('/edit_subscription',subcriptionControllers.updateSubscription)

//decativate subscription
router.delete('/delete_subscription',subcriptionControllers.deleteSubscription)

//decativate subscription
router.get('/get_subscription',subcriptionControllers.getSubscriptions)

//get single subscription
router.get('/get_singlesubscription/:subscriptionId',subcriptionControllers.getSubscription) //change get_singlesubscription

module.exports = router;