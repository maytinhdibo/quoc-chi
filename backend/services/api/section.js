const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const controller = require("../../controller/section.controller");

router.post("/new", auth.verifyAccessToken, controller.newSection);
router.post("/publish", auth.verifyAccessToken, controller.publishSection);
router.get("/draft/list", auth.verifyAccessToken, controller.getListDraft);
router.post("/draft/new", auth.verifyAccessToken, controller.saveNewDraft);
router.post("/draft/edit", auth.verifyAccessToken, controller.saveDraft);

module.exports = router;
