const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const controller = require("../../controller/documentation.controller");

router.get("/:id/section", auth.verifyAccessToken, controller.getSection);

module.exports = router;
