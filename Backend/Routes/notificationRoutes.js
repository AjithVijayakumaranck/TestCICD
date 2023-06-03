const wishlistControllers = require('../Controllers/wishlistControllers');
const { authoriseJwt } = require('../utilities/authorisation');
const notificationControllers =require('../Controllers/notificationControllers')

const router = require('express').Router()


//get notification datas from the database
router.get('/get_notification/:userId',authoriseJwt,notificationControllers.getNotification)

//get notification datas from the database
router.post('/sent_notification',authoriseJwt,notificationControllers.sentNotification)






module.exports = router;