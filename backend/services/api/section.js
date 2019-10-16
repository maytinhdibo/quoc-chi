const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const controller = require("../../controller/section.controller");

router.post("/new", auth.verifyAccessToken, controller.newSection);
router.post("/edit", auth.verifyAccessToken, controller.editSection);

module.exports = router;
