const {
  afficherCategorie,
  ajouterCategorie,
  modifierCategorie,
  supprimerCategorie,
  findCategoriebyid,
  findProduitbycategorieid,
} = require("./categorieController");

module.exports = {
  afficherCategorie,
  findProduitbycategorieid,
  ajouterCategorie,
  modifierCategorie,
  supprimerCategorie,
  findCategoriebyid,
};
