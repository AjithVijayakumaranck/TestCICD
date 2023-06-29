const carousalController = require('../../Controllers/carousalController');
const { authoriseJwt } = require('../../utilities/authorisation');
const upload = require('../../utilities/multer');

const router = require('express').Router();



//upload carousal image
router.post('/upload_carousal',authoriseJwt,upload.single('file'),carousalController.uploadCarousal)

//delete carousal image
router.put('/toggle_active',authoriseJwt,carousalController.deactivateCarousal)

//delete carousal image
router.delete('/delete_carousal',authoriseJwt,carousalController.deleteCarousal)

//get carousals
router.get('/get_carousal',authoriseJwt,carousalController.getCarousal)

module.exports = router;