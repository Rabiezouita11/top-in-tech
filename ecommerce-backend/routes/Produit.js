var express = require('express');
var router = express.Router();
const Produit = require('../controllers/ProduitAdmin/index');
const { UploidProduits } = require('../middlewares/UploidsProduits');



router.get('/afficherAllProduit', Produit.afficherAllProduit); // http://localhost:8080/produit/afficherAllProduit
router.post('/ajouterProduit', UploidProduits, Produit.ajouterProduit); // http://localhost:8080/produit/ajouterProduit
router.get ('/afficherAllProduitwithnameCategorie', Produit.afficherAllProduitwithnameCategorie); // http://localhost:8080/produit/afficherAllProduitwithnameCategorie
router.delete('/deleteProduit/:id', Produit.deleteProduit); // http://localhost:8080/produit/deleteProduit/1
router.get('/afficheproduitparid/:id', Produit.afficheproduitparid); // http://localhost:8080/produit/afficheproduitparid/1
router.get('/afficheImageProduit/:id', Produit.afficheImageProduit); // http://localhost:8080/produit/afficheImageProduit/1
module.exports = router;
