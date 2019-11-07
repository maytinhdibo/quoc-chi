const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const controller = require("../../controller/checkduplicate.controller");

router.post("/check", auth.verifyAccessToken, controller.checkDuplicate);
router.get("/list", auth.verifyAccessToken, controller.listDuplicate);

module.exports = router;
