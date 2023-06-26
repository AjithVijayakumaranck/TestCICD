const carousalController = require('../../Controllers/carousalController');
const upload = require('../../utilities/multer');

const router = require('express').Router();



//upload carousal image
router.post('/upload_carousal',upload.single('file'),carousalController.uploadCarousal)

//delete carousal image
router.put('/toggle_active',carousalController.deactivateCarousal)

//delete carousal image
router.delete('/delete_carousal',carousalController.deleteCarousal)

//get carousals
router.get('/get_carousal',carousalController.getCarousal)

module.exports = router;