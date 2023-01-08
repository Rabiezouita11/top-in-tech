var express = require("express");

var router = express.Router();

const controller = require("../controllers/avis/avisController");


router.post("/ajouter", controller.ajouterAvis);    // postman test: http://localhost:3000/avis/ajouter
router.get("/afficher", controller.afficheravis);  // postman test: http://localhost:3000/avis/afficher
router.put("/signaler/:id", controller.signalerAvis);  // postman test: http://localhost:3000/avis/signaler/1


module.exports = router;







