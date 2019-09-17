const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/form.controller')


router.get("/", auth.verifyAccessToken, controller.get);
router.get("/users", controller.getUsers);
router.get("/books", controller.getBooks);
router.get("/volumes", controller.getVolumes);
router.get("/chapters", controller.getChapters);


module.exports = router;