const router = require('express').Router();

const subcriptionControllers = require('../../Controllers/SuperAdmin/subscription_controller');
const { authoriseJwt } = require('../../utilities/authorisation');

//add subscription
router.post('/add_subscription',authoriseJwt,subcriptionControllers.addSubcription)

//edit subscription plan
router.put('/edit_subscription',authoriseJwt,subcriptionControllers.updateSubscription)

//decativate subscription
router.delete('/delete_subscription',authoriseJwt,subcriptionControllers.deleteSubscription)

//decativate subscription
router.get('/get_subscription',authoriseJwt,subcriptionControllers.getSubscriptions)

//get single subscription
router.get('/get_singlesubscription/:subscriptionId',authoriseJwt,subcriptionControllers.getSubscription) //change get_singlesubscription

module.exports = router;