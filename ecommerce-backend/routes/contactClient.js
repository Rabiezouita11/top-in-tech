var express = require("express");

var router = express.Router();

const contactClient = require("../controllers/contactClient/ContactClientController");


router.post("/ajoutercontact", contactClient.ajouterContact); // http://localhost:8080/ContactClient/ajoutercontact








module.exports = router;