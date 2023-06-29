const wishlistControllers = require('../Controllers/wishlistControllers');
const { authoriseJwt } = require('../utilities/authorisation');
const notificationControllers =require('../Controllers/notificationControllers')

const router = require('express').Router()


//get notification datas from the database
router.get('/get_notification',authoriseJwt,notificationControllers.getNotification)

//get notification datas from the database
router.post('/sent_notification',notificationControllers.sentNotification)






module.exports = router;