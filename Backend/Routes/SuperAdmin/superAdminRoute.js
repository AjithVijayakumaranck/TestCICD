const router = require('express').Router();

const superAdminControllers = require('../../Controllers/SuperAdmin/superAdmin_controller')


//superadmin Login
// router.post("/superadmin_register",superAdminControllers.superSignup)

//superadmin Login
router.post("/admin_login",superAdminControllers.superAdminLogin)

//forgot Password
router.post("/forgot_password",superAdminControllers.forgotPassword)

//verifyOtp
router.post("/verify_Otp",superAdminControllers. verifyOtp)

//resetpassword
router.post("/reset_Password",superAdminControllers. resetPassword)

module.exports = router;