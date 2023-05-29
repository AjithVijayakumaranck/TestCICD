const router = require('express').Router();

const superAdminControllers = require('../../Controllers/SuperAdmin/superAdmin_controller')


//superadmin Login
router.post("/admin_login",superAdminControllers.superAdminLogin)

//forgot Password
router.post("/forgot_password",superAdminControllers.forgotPassword)

module.exports = router;