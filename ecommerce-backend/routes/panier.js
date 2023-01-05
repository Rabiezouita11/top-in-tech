var express = require('express');

var router = express.Router();

const Paniers = require('../controllers/panier/index');

router.post('/ajouterPanier', Paniers.ajouterPanier); // http://localhost:8080/panier/ajouterPanier
router.delete('/deletePanier/:id/:idProduit', Paniers.deletePanier); // http://localhost:8080/panier/deletePanier/1
router.get('/afficherPanierparId/:id', Paniers.afficherPanierparId); // http://localhost:8080/panier/afficherPanierparId/1

router.get('/countCloneProduit/:id', Paniers.countCloneProduit); // http://localhost:8080/panier/countCloneProduit/1
router.get('/totaleprixpanier/:id', Paniers.totaleprixpanier); // http://localhost:8080/panier/totaleprixpanier/1
router.put ('/updatePanier', Paniers.updatePanier); // http://localhost:8080/panier/updatePanier

module.exports = router;
