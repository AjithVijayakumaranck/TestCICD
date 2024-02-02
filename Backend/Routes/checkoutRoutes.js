const checkoutControllers = require('../Controllers/checkoutControllers')

const  router = require('express').Router()

const express = require('express')
const { authoriseJwt } = require('../utilities/authorisation')



//razorpay createorder
router.post('/create_order_razorpay',authoriseJwt,checkoutControllers.createRazorpayOrder)

//razorpay createorder
router.post('/validate_razorpay_order',checkoutControllers.orderValidation)

//stripe checkout
router.post('/stripe-checkout',authoriseJwt,checkoutControllers.sripeCheckout)

//paypal checkout
router.post('/create-order',authoriseJwt,checkoutControllers.ppCreateOrder)

//stripe webhook
router.post('/webhook',express.raw({type: 'application/json'}),checkoutControllers.stripeWebhook)

module.exports = router
