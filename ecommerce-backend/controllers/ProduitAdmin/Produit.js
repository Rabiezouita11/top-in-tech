const { produit } = require("../../models");

const { imageProduit , categorie} = require("../../models");

const ajouterProduit = async (req, res, next) => {
  try {
    const { nom, prix, Description, id_categorie, quantite } = req.body;
    const image = req.files[0].path;
    produitdejaexiste = await produit.findOne({ where: { nom: nom } });
    if (produitdejaexiste) {
      return res.status(400).json({ error: "produit deja existe" });
    } else {
      const newProduit = await produit.create({
        nom,
        prix,
        Description,
        image,
        id_categorie,
        quantite,
      });
      if (newProduit) {
        if (req.files.length != 0) {
          for (const el of req.files) {
            await imageProduit.create(
              { image: el.path 
              ,id_produit: newProduit.id }
            );
          }
        }
        return res.status(201).json(newProduit);
      }
    }
  } catch (error) {
console.log(error.message)
  }
};

const afficherAllProduitwithnameCategorie = async (req, res, next) => {
    try {
        const produitts = await produit.findAll({
            include: {
                model: categorie,
                attributes: ["name"],
            },
        });
        if (produitts) {
            return res.status(200).json(produitts);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const deleteProduit = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (imageProduit.findOne({ where: { id_produit: id } })) {
        
          const deleteilmage = await imageProduit.destroy({
            where: { id_produit: id },
        });
        
        if (deleteilmage) {
             await produit.destroy({
                where: { id: id },
            });

            return res.status(204).send("Produit deleted");
        
        }
        
        
        }
    


            await produit.destroy({
                where: { id: id },
            });

            return res.status(204).send("Produit deleted");
        
      
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
};

const afficherAllProduit = async (req, res, next) => {

    try {

        const produitts = await produit.findAll();  
        if (produitts) {

            return res.status(200).json(produitts);
        } 
    } catch (error) {

        console.log(error.message);
    }
};


const afficheproduitparid = async (req, res, next) => {

    try {

        const { id } = req.params;
        const produits = await produit.findOne({ where: { id: id } });
        if (produits) {


            return res.status(200).json(produits);
        }
    } catch (error) {

        console.log(error.message);
    }
};



const afficheImageProduit = async (req, res, next) => {

    try {

        const { id } = req.params;
        const imageproduits = await imageProduit.findAll({ where: { id_produit: id } });
        if (imageproduits) {




        





            return res.status(200).json(imageproduits);
        }
    } catch (error) {


        console.log(error.message);
    }
};









module.exports = {
  ajouterProduit,
  afficherAllProduitwithnameCategorie,
  deleteProduit,
  afficherAllProduit,
  afficheproduitparid,
  afficheImageProduit,
};
