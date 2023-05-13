const checkoutControllers = require('../Controllers/checkoutControllers')

const router = require('express').Router()

//stripe checkout
router.post('/stripe-checkout',checkoutControllers.sripeCheckout)

module.exports = router
