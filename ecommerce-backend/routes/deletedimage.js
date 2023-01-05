var express = require("express");

var router = express.Router();
const image = require("../controllers/deleteImageCont/image");


/* GET categories listing. */
router.delete("/remove/:name", image.remove);
module.exports = router;
