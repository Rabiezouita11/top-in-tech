const { panier, commande, coupon, produit } = require("../../models");

const placeorder = async (req, res, next) => {
  // how
  try {
    const { id_user, lat, lng, Produits, totaleprix, couponn , paymentMethod} = req.body;


    const panieruser = await panier.findAll({ where: { id_user: id_user } });
    panieruser.forEach(async (panieruser) => {
      const produits = await produit.findOne({
        where: { id: panieruser.id_produit },
      });


      const quantite = produits.quantite - panieruser.quantite;
    
     return await produits.update({ quantite: quantite });
  
    });

    const findcoupon = await coupon.findOne({ where: { id: couponn } });
  

    if (findcoupon) {

    const x = totaleprix - findcoupon.prix;
    const num = Math.abs(x);
    const commandeuser = await commande.create({
      id_user: id_user,
      lat: lat,
      lng: lng,
      Produit: Produits,
      total_prix: num,
      etat_commande: "en cours",
      typedelivraison: paymentMethod,
    });

    if (commandeuser) {
      const deletedcoupon = await coupon.destroy({ where: { id: couponn } });
      const deletePanier = await panier.destroy({
        where: { id_user: id_user },
      });
    }
    return res.status(200).json({commandeuser });
  } else {
    const commandeuser = await commande.create({
      id_user: id_user,
      lat: lat,
      lng: lng,
      Produit: Produits,
      total_prix: totaleprix,
      etat_commande: "en cours",
      typedelivraison: paymentMethod,

    });

    if (commandeuser) {
      const deletePanier = await panier.destroy({
        where: { id_user: id_user },
      });
    }
    return res.status(200).json({ commandeuser });
  }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Error" });
  }
};

const getcommandebyid   = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findcommande = await commande.findOne({ where: { id: id } });
    return res.status(200).json({ findcommande });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Error" });
  }
};



module.exports = {
  placeorder,
  getcommandebyid
};
