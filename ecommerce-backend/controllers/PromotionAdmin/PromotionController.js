const { produit } = require("../../models");

const afficherPromotion = async (req, res) => {
  try {
    const produitPromotion = await produit.findAll({
      where: { promotion: "true" },
    });
    if (produitPromotion) {
      return res.status(200).json(produitPromotion);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const afficherproduitnotInPromotion = async (req, res) => {
  try {
    const produitnotInPromotion = await produit.findAll({
      where: { promotion:   'false' },
    });
    if (produitnotInPromotion) {
      return res.status(200).json(produitnotInPromotion);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const ajouterPromotion = async (req, res) => {
  try {
    let Promotion = req.body;
    console.log(Promotion.idproduit);
    console.log(Promotion.prix);
    console.log(Promotion.datapromotion);
    let x = Promotion.prix * (  1 - ( Promotion.pourcentage / 100));
    console.log(x);
    const produitPromotion = await produit.findOne({
      where: { id: Promotion.idproduit },
    });
    if (produitPromotion) {
      await produitPromotion.update({
        promotion: "true",
        prixold:Promotion.prix ,
        prix: x,
        date_exp : Promotion.datapromotion,
        numberpromotion: Promotion.pourcentage,
      });
      return res.status(200).json(produitPromotion);
    }
  } catch (error) {
    console.log(error.message);
  }
};



const afficherpromotionparId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
   await produit.findOne({
        where: { id: id },
        }).then((produit) => {
            if (produit) {
                return res.status(200).json(produit);
            }
        }
    );
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
  afficherPromotion,
  afficherproduitnotInPromotion,
  ajouterPromotion,
  afficherpromotionparId
};
