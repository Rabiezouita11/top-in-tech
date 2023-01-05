const { commande } = require("../../models");

const affichercommande = async (req, res, next) => {
  try {
    const commandes = await commande.findAll({});
    return res.status(200).json(commandes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
  affichercommande,

};
