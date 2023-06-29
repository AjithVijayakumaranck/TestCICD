const carousalController = require('../Controllers/carousalController');
const { authoriseJwt } = require('../utilities/authorisation');

const router = require('express').Router();

router.get('/slides_view',carousalController.getCarousal)

router.get('/get_slides',carousalController.getCarousal)

module.exports = router;