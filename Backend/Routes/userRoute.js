const router = require('express').Router()

const passport = require('passport')
const authentication_controllers = require('../Controllers/authentication_controllers')

const user_registration = require('../Controllers/user_registration')

const {CLIENT_URL} = process.env


//email verification routes

router.post('/register', user_registration.userRegistration)

router.post('/verifyemail', user_registration.verifyEmail)

//phone number verification routes 

router.post('/registerphone', user_registration.userRegistration_mobile)

router.post('/verifyphone', user_registration.verifyphone)

//Login with email

router.post('/loginwithemail',authentication_controllers.loginWithEmail)

//login with phone

router.post('/loginwithphone',authentication_controllers.loginWithPhone)


module.exports = router