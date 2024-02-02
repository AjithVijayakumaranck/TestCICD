const profile_controller = require('../Controllers/profile_controller')
const { authoriseJwt } = require('../utilities/authorisation')
const upload = require('../utilities/multer')

const router = require('express').Router()




//get profile route
router.get('/get_profile/:userId',profile_controller.getProfile)

//update profile
router.put('/update_profile',authoriseJwt,upload.single("file"),profile_controller.updateProfile)

//update privacy settings
router.put('/update_privacy',authoriseJwt,profile_controller.togglePrivacy)

//update email
router.post('/update_email',authoriseJwt,profile_controller.updateEmail)

//check peudoname
router.post('/check_pseudoname',authoriseJwt,profile_controller.checkPsudoname)

//verify email
router.put('/verify_email',authoriseJwt,profile_controller.updateEmailVerification)

//update phoneNumber
router.post('/update_phone',authoriseJwt,profile_controller.addPhoneNumber)

//verify phoneNumber
router.put('/verify_phone',authoriseJwt,profile_controller.addPhoneNumberVerification)

//update password
router.put('/update_password',authoriseJwt,profile_controller.updatePassword)

//delete password
router.delete('/delete_account/:Id',authoriseJwt,profile_controller.deleteProfile)

//delete password
router.post('/profile_rating',authoriseJwt,profile_controller.profileRating)

//Rating routes
router.post('/add_reply',authoriseJwt,profile_controller.ratingReplay)

// get Rating 
router.get('/get_rating',profile_controller.getReviews)

 
module.exports = router