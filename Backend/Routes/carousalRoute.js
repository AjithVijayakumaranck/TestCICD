const carousalController = require('../Controllers/carousalController');
const { authoriseJwt } = require('../utilities/authorisation');

const router = require('express').Router();

router.get('/slides_view',authoriseJwt,carousalController.getCarousal)

router.get('/get_slides',authoriseJwt,carousalController.getCarousal)

module.exports = router;