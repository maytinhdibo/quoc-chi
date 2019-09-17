const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/analytics.controller')


router.get("/books", auth.verifyAccessToken, controller.getBooks);
router.get("/book", auth.verifyAccessToken, controller.getBook);
router.get("/volumes", auth.verifyAccessToken, controller.getVolumes);
router.get("/volume", auth.verifyAccessToken, controller.getVolume);
router.get("/chapters", auth.verifyAccessToken, controller.getChapters);
router.get("/chapter", auth.verifyAccessToken, controller.getChapter);

module.exports = router;