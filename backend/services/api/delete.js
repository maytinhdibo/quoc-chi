const express = require("express");
const router = express.Router();
const controller = require("../../controller/delete.controller");
router.delete("/section", controller.deleteSection);
// router.delete("/",function(req,res){
//     res.json("thao");
// });
router.delete("/chapter", controller.deleteChapter);
router.delete("/volume",controller.deleteVolume)
module.exports = router;