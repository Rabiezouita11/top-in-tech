const { panier, produit , categorie, expererpanier } = require("../../models");

// count total price of panier

// how count clone quantity of produit in panier

const totaleprixpanier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const panierr = await panier.findAll({
      where: {
        id_user: id,
      },
    });
    if (panierr) {
      let total = 0;
      panierr.forEach((element) => {
        total += element.quantite * element.newprix;
      });
      return res.status(200).json(total);
    }
    if (!panierr) {
      return res.status(404).send("panier not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const countCloneProduit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const panierr = await panier.findAll({
      where: {
        id_user: id,
      },
    });
    if (panierr) {
      let total = 0;
      panierr.forEach((element) => {
        total += element.quantite;
      });
      return res.status(200).json(total);
    }
    if (!panierr) {
      return res.status(404).send("panier not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const afficherPanierparId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const panierr = await panier.findAll({
      where: {
        id_user: id,
      },
      // how get image from produit table
      include: [
        {
          model: produit,
          attributes: ["image", "nom", "id"],
        },
      ],
    });
    if (panierr) {
       console.log(panierr);
      return res.status(200).json(panierr);
     
    }
    if (!panierr) {
      return res.status(404).send("panier not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const ajouterPanier = async (req, res, next) => {
  try {
    const { id, idProduit, prix } = req.body;

    var someDate = new Date();
    someDate.setDate(someDate.getDate());
    var dateFormated = someDate.toISOString().substr(0, 10);
    const expererpanierr = await expererpanier.findOne({

      where: {
        id_user: id,
      },
    });

    if (!expererpanierr) {
        await expererpanier.create({
        id_user: id,
        date_expiration: dateFormated,
      });
   
    }else{
      await expererpanier.update({
        date_expiration: dateFormated,
      },{
        where: {
          id_user: id,
        },
      });
    }



    const findproduit = await produit.findOne({
      where: {
        id: idProduit,
      },
    });
    // afficher les produits dans function findproduit
    if (findproduit.quantite == 0) {
      return res.status(400).send("produit n'est plus disponible");
    }

    const produitdejaexisetedanspanier = await panier.findOne({
      where: {
        id_user: id,
        id_produit: idProduit,
      },
    });
    if (produitdejaexisetedanspanier) {
      return res.status(401).send("produit deja existé dans panier");
    }
    const findcategoriebyid = await categorie.findOne({
      where: {
        id: findproduit.id_categorie,
      },
    });
    const panierr = await panier.create({
      id_user: id,
      id_produit: idProduit,
      quantite: 1,
      prix: prix,
      newprix: prix,
      nom_produit: findproduit.nom,
      description : findproduit.Description,
      categorie : findcategoriebyid.name,
      image : findproduit.image,
    });
   
     res.status(201).json(panierr);
    

      

      

    
  } catch (error) {
    console.log(error.message);
  }
};

const deletePanier = async (req, res, next) => {
  try {
    const { id, idProduit } = req.params;
    const findpanier = await panier.findOne({
      where: {
        id_user: id,
        id_produit: idProduit,
      },
    });
    console.log(findpanier.quantite);
    const findproduit = await produit.findOne({
      where: {
        id: idProduit,
      },
    });

 
    

    const panierr = await panier.destroy({
      where: {
        id_user: id,
        id_produit: idProduit,
      },
    });
    return res.status(201).json(panier);
  } catch (error) {
    console.log(error.message);
  }
};

const updatePanier = async (req, res, next) => {
  try {
    const { id, idProduit, quantite } = req.body;
    const quantitee = parseInt(quantite);
    console.log(id, idProduit, quantitee);
    const findproduit = await produit.findOne({
      where: {
        id: idProduit,
      },
    });
    const panierrr = await panier.findOne({
      where: {
        id_user: id,
        id_produit: idProduit,
      },
    });

    if (panierrr.quantite + quantitee > findproduit.quantite) {
      return res.status(400).send("quantite n'est pas disponible");
    }
    const panierr = await panier.update(
     
      { quantite: panierrr.quantite + quantitee,
        prix: panierrr.newprix * (panierrr.quantite + quantitee)  },
      {
        where: {
          id_user: id,
          id_produit: idProduit,
        },
      }
    );

    return res.status(201).json(panier);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  afficherPanierparId,
  ajouterPanier,
  deletePanier,
  updatePanier,
  countCloneProduit,
  totaleprixpanier,
};
