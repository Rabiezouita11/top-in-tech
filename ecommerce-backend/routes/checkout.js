var express = require("express");

var router = express.Router();

const checkout = require("../controllers/checkout/checkoutController");



router.post("/placeorder", checkout.placeorder); // http://localhost:8080/checkout/placeorder

router.get("/getorders/:id", checkout.getcommandebyid); // http://localhost:8080/checkout/getorders/:id











module.exports = router;