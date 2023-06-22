const checkoutControllers = require('../Controllers/checkoutControllers')

const router = require('express').Router()

const express = require('express')





//stripe checkout
router.post('/stripe-checkout',checkoutControllers.sripeCheckout)

//stripe webhook
router.post('/webhook',express.raw({type: 'application/json'}),checkoutControllers.stripeWebhook)

module.exports = router
