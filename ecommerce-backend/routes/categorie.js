var express = require("express");

var router = express.Router();
const Categories = require("../controllers/categorie/index");
const { checkjwt } = require("../middlewares/checkjwt");
const { upload } = require("../middlewares/Uploid");

/* GET categories listing. */
router.get("/affichercategorie", Categories.afficherCategorie); // http://localhost:8080/categories/affichercategorie
router.post("/ajoutercategorie", checkjwt,  upload, Categories.ajouterCategorie); // http://localhost:8080/categories/ajoutercategorie
router.put("/modifiercategorie/:id", upload, Categories.modifierCategorie); // http://localhost:8080/categories/modifiercategorie/1
router.delete("/supprimercategorie/:id", Categories.supprimerCategorie); // http://localhost:8080/categories/supprimercategorie/1
router.get("/findCategoriebyid/:id", Categories.findCategoriebyid); // http://localhost:8080/categories/findCategoriebyid/1
router.get("/findProduitbycategorieid/:id", Categories.findProduitbycategorieid); // http://localhost:8080/categories/findProduitbycategorieid/1
module.exports = router;
