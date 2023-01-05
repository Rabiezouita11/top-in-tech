var express = require("express");

var router = express.Router();

const Coupon = require("../controllers/coupon/coupon");


router.get("/affichecouponbyiduser/:id", Coupon.affichecouponbyiduser); // http://localhost:8080/coupon/affichecouponbyiduser/1








module.exports = router;