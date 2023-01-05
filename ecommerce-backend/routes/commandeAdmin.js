var express = require("express");

var router = express.Router();
const commandeAdmin = require("../controllers/commandeAdmin/index");



router.get("/affichercommande", commandeAdmin.affichercommande); // http://localhost:8080/commandeAdmin/affichercommande












module.exports = router;