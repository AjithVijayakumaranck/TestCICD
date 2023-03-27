const profile_controller = require('../Controllers/profile_controller')
const { authoriseJwt } = require('../utilities/authorisation')

const router = require('express').Router()




//get profile route
router.get('/get_profile',authoriseJwt,profile_controller.getProfile)

//update profile
router.put('/update_profile',authoriseJwt,profile_controller.updateProfile)

//update email
router.post('/update_email',authoriseJwt,profile_controller.updateEmail)
//verify email
router.put('/verify_email',authoriseJwt,profile_controller.updateEmailVerification)

//update phoneNumber
router.post('/update_phone',authoriseJwt,profile_controller.addPhoneNumber)
//verify phoneNumber
router.put('/verif_yphone',authoriseJwt,profile_controller.addPhoneNumberVerification)

//update password
router.put('/update_password',authoriseJwt,profile_controller.updatePassword)

//delete password
router.delete('/delete_account/:Id',authoriseJwt,profile_controller.deleteProfile)


module.exports = router