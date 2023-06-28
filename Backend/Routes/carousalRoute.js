const carousalController = require('../Controllers/carousalController');
const { authoriseJwt } = require('../utilities/authorisation');

const router = require('express').Router();

router.get('/slides_view',authoriseJwt,carousalController.getCarousal)

module.exports = router;