const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const role = require('../../middleware/verify_user_role');
const controller = require('../../controller/analytics.controller')

router.get("/overview", auth.verifyAccessToken, role.isAdmin, controller.overview);
router.get("/books", auth.verifyAccessToken, controller.getBooks);
router.get("/book", auth.verifyAccessToken, controller.getBook);
router.get("/volumes", auth.verifyAccessToken, controller.getVolumes);
router.get("/volume", auth.verifyAccessToken, controller.getVolume);
router.get("/chapters", auth.verifyAccessToken, controller.getChapters);
router.get("/chapter", auth.verifyAccessToken, controller.getChapter);
router.get("/sections", auth.verifyAccessToken, controller.getSections);
router.get("/section", auth.verifyAccessToken, controller.getSection);
router.get("/docs", auth.verifyAccessToken, controller.getDocs);
router.get("/doc", auth.verifyAccessToken, controller.getDoc);

module.exports = router;