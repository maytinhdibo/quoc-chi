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
const docRouter = require("./api/documentation");
const checkDuplicate = require("./api/checkduplicate");
const deleteRouter = require("./api/delete");
router.use("/", userRouter);
router.use("/form-data", formRouter);
router.use("/analytics", analyticsRouter);
router.use("/search", searchRouter);
router.use("/book", bookRouter);
router.use("/volume", volumeRouter);
router.use("/chapter", chapterRouter);
router.use("/section", sectionRouter);
router.use("/doc", docRouter);
router.use("/duplicate", checkDuplicate);
router.use("/delete", deleteRouter);


module.exports = router;
