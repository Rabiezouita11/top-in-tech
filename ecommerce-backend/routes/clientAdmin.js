var express = require("express");

var router = express.Router();

const ClientAdmin = require("../controllers/ClientAdmin/index");


router.get("/afficherclient", ClientAdmin.afficherClient); // http://localhost:8080/clientAdmin/afficherclient

router.put("/banuser/:id", ClientAdmin.banuser); // http://localhost:8080/clientAdmin/banuser/1






module.exports = router;