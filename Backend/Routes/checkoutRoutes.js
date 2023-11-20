const checkoutControllers = require('../Controllers/checkoutControllers')

const  router = require('express').Router()

const express = require('express')
const { authoriseJwt } = require('../utilities/authorisation')





//stripe checkout
router.post('/stripe-checkout',authoriseJwt,checkoutControllers.sripeCheckout)

//paypal checkout
router.post('/create-order',authoriseJwt,checkoutControllers.ppCreateOrder)

//stripe webhook
router.post('/webhook',express.raw({type: 'application/json'}),checkoutControllers.stripeWebhook)

module.exports = router
