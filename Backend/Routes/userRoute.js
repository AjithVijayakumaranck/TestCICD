const user_registration = require('../Controllers/user_registration')

const router = require('express').Router()

//email verification routes

router.post('/register',user_registration.userRegistration)

router.post('/verifyemail',user_registration.verifyEmail)

//phone number verification routes 

router.post('/registerphone',user_registration.userRegistration_mobile)

router.post('/verifyphone',user_registration.verifyphone)


module.exports = router