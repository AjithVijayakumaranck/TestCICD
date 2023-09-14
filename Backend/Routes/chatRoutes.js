const router = require('express').Router()
const chatControllers = require('../Controllers/chat_controllers')
const { authoriseJwt } = require('../utilities/authorisation')



router.post('/createconversation',authoriseJwt,chatControllers.createConversation)

router.get('/getconversation/:userId',authoriseJwt,chatControllers.getConversation)

router.get('/getspecific_converstaion/:conversationId',authoriseJwt,chatControllers.getSpecificConversation)

router.post('/addmessage',authoriseJwt,chatControllers.addMessage)

router.get('/getmessages/:conversationId',authoriseJwt,chatControllers.getMessage)

router.get('/conversation_count',authoriseJwt,chatControllers.getUnreadConverstaionCount)

router.post('/mark_read',authoriseJwt,chatControllers.markRead)

module.exports = router