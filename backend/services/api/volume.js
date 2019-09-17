const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/volume.controller')


router.post("/new", controller.newVolume);
router.post("/edit", controller.editVolume);

module.exports = router;