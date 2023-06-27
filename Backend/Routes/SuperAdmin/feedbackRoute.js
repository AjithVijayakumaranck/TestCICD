const feedbackController = require('../../Controllers/feedbackController');
const { authoriseJwt } = require('../../utilities/authorisation');

const router = require('express').Router();


router.get('/get_feedbacks',authoriseJwt,feedbackController.getFeedbacks)

router.put('/mark_as_read/:feedbackId',authoriseJwt,feedbackController.markRead)

module.exports = router;