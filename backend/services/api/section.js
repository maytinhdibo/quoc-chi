const express = require("express");
const router = express.Router();
const auth = require("../../middleware/verify_access_token");
const roleSection = require("../../middleware/verify_section_role.js");
const controller = require("../../controller/section.controller");

router.post("/new", auth.verifyAccessToken, controller.newSection);
router.post("/publish", auth.verifyAccessToken, roleSection.isEditableSection, controller.publishSection);
router.get("/get", auth.verifyAccessToken, controller.getSection);
router.get("/editable-version", auth.verifyAccessToken, controller.getEditableVersion);
router.get("/draft/list", auth.verifyAccessToken, controller.getListDraft);
// router.post("/draft/new", auth.verifyAccessToken, controller.saveNewDraft);
router.post("/draft/edit", auth.verifyAccessToken, roleSection.isEditableSection, controller.saveDraft);

router.get("/editors", auth.verifyAccessToken, controller.getEditors);
router.post("/editors/edit", auth.verifyAccessToken, controller.editEditors);
router.delete("/delete", controller.deleteSectionDraft);

module.exports = router;