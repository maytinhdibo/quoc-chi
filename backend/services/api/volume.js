const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const authUserRole = require("../../middleware/verify_user_role");
const controller = require("../../controller/volume.controller");

router.post("/new", auth.verifyAccessToken, controller.newVolume);
router.post("/edit", auth.verifyAccessToken, async function (req, res, next) {
    return authUserRole.isVolumeAdmin(req, res, next, req.query.id);
}, controller.editVolume);
router.delete("/delete", controller.deleteVolume);

module.exports = router;
