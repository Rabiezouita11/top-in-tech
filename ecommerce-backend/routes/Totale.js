var express = require('express');
var router = express.Router();

const { countProduit, countCommande, countQuiz, countContact , afficheRate , countrate } = require("../controllers/totale/totaleController");


router.get('/countProduit', countProduit); // http://localhost:8080/totale/countProduit
router.get('/countCommande', countCommande); // http://localhost:8080/totale/countCommande
router.get('/countQuiz', countQuiz); // http://localhost:8080/totale/countQuiz
router.get('/countContact', countContact); // http://localhost:8080/totale/countContact
router.get('/afficheRate/:idproduits', afficheRate); // http://localhost:8080/totale/afficheRate
router.get('/countrate/:idproduits', countrate); // http://localhost:8080/totale/countrate














module.exports = router;