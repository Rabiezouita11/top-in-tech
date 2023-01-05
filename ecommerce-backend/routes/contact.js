var express = require("express");

var router = express.Router();
const contactAdmin = require("../controllers/contactAdmin/index");




router.get("/affichercontact", contactAdmin.affichercontact); // http://localhost:8080/ContactAdmin/affichercontact
























module.exports = router;