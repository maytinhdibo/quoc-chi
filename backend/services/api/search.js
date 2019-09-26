const express = require('express');
const router = express.Router();
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/search.controller')


router.post("/", auth.verifyAccessToken, controller.search);

module.exports = router;