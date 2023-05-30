const router = require('express').Router();


const profile_controller = require('../../Controllers/profile_controller');
const { authoriseJwt } = require('../../utilities/authorisation');

//get single users
router.get('/get_profile/:userId',authoriseJwt,profile_controller.getProfile)

//get all users
router.get('/get_allprofile',authoriseJwt,profile_controller.getAllProfiles)

//block user
router.delete('/deleteProfile/:Id',authoriseJwt,profile_controller.deleteProfile)




module.exports = router;