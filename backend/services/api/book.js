const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/book.controller')


router.post("/new", controller.newBook);
router.post("/edit", controller.editBook);

module.exports = router;