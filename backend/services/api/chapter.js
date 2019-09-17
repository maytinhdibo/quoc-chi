const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/chapter.controller')


router.post("/new", controller.newChapter);
router.post("/edit", controller.editChapter);

module.exports = router;