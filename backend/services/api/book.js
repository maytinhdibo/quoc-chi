const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/book.controller')


router.post("/new", auth.verifyAccessToken, controller.newBook);
router.post("/edit",auth.verifyAccessToken, controller.editBook);

module.exports = router;