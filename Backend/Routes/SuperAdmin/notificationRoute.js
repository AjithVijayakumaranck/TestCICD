
const router = require('express').Router()

const notificationControllers = require('../../Controllers/notificationControllers');
const { authoriseJwt } = require('../../utilities/authorisation');



//get notification datas from the database
router.get('/get_notification/:userId',authoriseJwt,notificationControllers.getNotification)

//get notification datas from the database
router.post('/sent_notification',authoriseJwt,notificationControllers.sentNotification)






module.exports = router;