const router = require('express').Router();

const superAdminControllers = require('../../Controllers/SuperAdmin/superAdmin_controller');
const { authoriseJwt } = require('../../utilities/authorisation');


//superadmin Login
router.post("/admin_create",authoriseJwt,superAdminControllers.createAdmin)

//superadmin Login
router.post("/admin_login",superAdminControllers.superAdminLogin)

//forgot Password
router.post("/forgot_password",superAdminControllers.forgotPassword)

//verifyOtp
router.post("/verify_Otp",superAdminControllers. verifyOtp)

//resetpassword
router.post("/reset_Password",superAdminControllers. resetPassword)





//password update
//nb: - used for updatePassword from the admin profile it needs current password
router.put('/update_password',authoriseJwt,superAdminControllers.updatePassword)

//role upgrade
router.put('/upgrade_role',authoriseJwt,superAdminControllers. upgradeRole)

//get admins
router.get('/get_admins',authoriseJwt,superAdminControllers.getAdmin)

//get superadmins
router.get('/get_superadmins',authoriseJwt,superAdminControllers.getSuperAdmin)

//get admin profile
router.get('/get_profile',authoriseJwt,superAdminControllers.getProfile)

//update admin profile
router.put('/update_profile',authoriseJwt,superAdminControllers.updateProfile)

//check username is unique or not
router.get('/check_username',superAdminControllers.uniqueUserName)



module.exports = router;