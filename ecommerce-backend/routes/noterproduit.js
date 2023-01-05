var express = require("express");

var router = express.Router();
const noterProduitController = require("../controllers/noterProduit/noterProduitController");



router.post("/ajouterRate", noterProduitController.ajouterRate); //   http://localhost:3000/noterproduit/ajouterRate

router.get("/checkRateexistUser/:id_user/:id_produit", noterProduitController.checkRateexistUser); //   http://localhost:3000/noterproduit/checkRateexistUser

router.get("/afficheRateparidproduit/:id", noterProduitController.afficheRateparidproduit); //   http://localhost:3000/noterproduit/afficheRateparidproduit")













module.exports = router;



