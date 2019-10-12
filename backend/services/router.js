const express = require("express");
const router = express.Router();

const userRouter = require("./api/user");
const formRouter = require("./api/form-data");
const analyticsRouter = require("./api/analytics");
const searchRouter = require("./api/search");
const bookRouter = require("./api/book");
const volumeRouter = require("./api/volume");
const chapterRouter = require("./api/chapter");
const sectionRouter = require("./api/section");
const checkDuplicate = require("./api/checkduplicate");

router.use("/", userRouter);
router.use("/form-data", formRouter);
router.use("/analytics", analyticsRouter);
router.use("/search", searchRouter);
router.use("/book", bookRouter);
router.use("/volume", volumeRouter);
router.use("/chapter", chapterRouter);
router.use("/section", sectionRouter);
router.use("/duplicate", checkDuplicate);


module.exports = router;
