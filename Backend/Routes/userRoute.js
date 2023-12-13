const router = require('express').Router()

const passport = require('passport')
const authentication_controllers = require('../Controllers/authentication_controllers')

const user_registration = require('../Controllers/user_registration')

const {CLIENT_URL} = process.env


//email verification routes

// router.post('/register', user_registration.userRegistration)

// router.post('/verifyemail', user_registration.verifyEmail)

router.post('/register2n1', user_registration.registrationBothOtp)

router.post('/verifyemail2n1', user_registration.verifyEmailBoth)

//phone number verification routes 

router.post('/registerphone', user_registration.userRegistration_mobile)

router.post('/verifyphone', user_registration.verifyphone)

//Login with email

router.post('/login',authentication_controllers.login)

//login with phone

// router.post('/loginwithphone',authentication_controllers.loginWithPhone)

//otp routes

router.post('/otpsent_email',authentication_controllers.email_otpSent)

router.post('/otpsent_mobile',authentication_controllers.sendphoneOtp)

//otp verify routes

router.post('/verifyotp_email',authentication_controllers.verifyOtp)

router.post('/verifyotp_mobile',authentication_controllers.verificationPhoneOtp)

//reset password

router.post('/resetpassword',authentication_controllers.resetPassword)



module.exports = router