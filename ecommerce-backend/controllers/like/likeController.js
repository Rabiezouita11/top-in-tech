const { like } = require("../../models");

const ajouterlike = async (req, res, next) => {
  try {
    const { id_user, id_produit } = req.body;

    const findlikes = await like.findOne({ where: { id_user, id_produit } });
    if (findlikes) {
      const deleteLike = await like.destroy({ where: { id_user, id_produit } });
      return res.status(200).json({ message: "like supprimé" });
    } else {
      const newlike = await like.create({ id_user, id_produit });
      return res.status(200).json({ message: "like ajouté" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getcountlikebyidproduit = async (req, res, next) => {
  try {
    const { id } = req.params || { id_produit: null };
  
    const countlike = await like.count({ where: { id_produit: id } });
    return res.status(200).json({ countlike });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  ajouterlike,
  getcountlikebyidproduit,
};
