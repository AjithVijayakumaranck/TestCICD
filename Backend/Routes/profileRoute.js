const profile_controller = require('../Controllers/profile_controller')

const router = require('express').Router()




//get profile route
router.get('/get_profile',profile_controller.getProfile)

//update profile
router.put('/update_profile',profile_controller.updateProfile)

//update email
router.post('/update_email',profile_controller.updateEmail)
//verify email
router.put('/verify_email',profile_controller.updateEmailVerification)

//update phoneNumber
router.post('/update_phone',profile_controller.addPhoneNumber)
//verify phoneNumber
router.put('/verif_yphone',profile_controller.addPhoneNumberVerification)

//update password
router.put('/update_password',profile_controller.updatePassword)

//delete password
router.delete('/delete_account/:Id',profile_controller.deleteProfile)


module.exports = router