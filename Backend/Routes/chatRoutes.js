const router = require('express').Router()
const chatControllers = require('../Controllers/chat_controllers')



router.post('/createconversation',chatControllers.createConversation)

router.get('/getconversation/:userId',chatControllers.getConversation)

router.get('/getspecific_converstaion/:conversationId',chatControllers.getSpecificConversation)

router.post('/addmessage',chatControllers.addMessage)

router.get('/getmessages/:conversationId',chatControllers.getMessage)

module.exports = router