const { categorie , produit } = require("../../models");
const jwt = require('jsonwebtoken');
const afficherCategorie = async (req, res, next) => {
  try{
    const categories = await categorie.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const ajouterCategorie = async (req, res, next) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');
    if (!claims) {

      return res.status(401).json({message: "Verfier votre authentification"})
    }
   
    const { name } = req.body;
    const Image = req.file.path;
    const newCategorie = await categorie.create({
      name,

      Image,
    });
    return res.status(201).json(newCategorie);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const modifierCategorie = async (req, res, next) => {
  if (!req.file) {
    try {
      const { name } = req.body;

      const { id } = req.params;
      const updated = await categorie.update(
        {
          name,
        },
        {
          where: { id: id },
        }
      );
      if (updated) {
        const updatedCategorie = await categorie.findOne({ where: { id: id } });
        return res.status(200).json({ categorie: updatedCategorie });
      }
      throw new Error("Categorie not found");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const updated = await categorie.update(
        {
          name,
          Image : req.file.path,
        },
        {
          where: { id: id },
        }
      );
      if (updated) {
        const updatedCategorie = await categorie.findOne({ where: { id: id } });
        return res.status(200).json({ categorie: updatedCategorie });
      }
      throw new Error("Categorie not found");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
const supprimerCategorie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await categorie.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(201).send("Categorie deleted");
    }
    throw new Error("Categorie not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findCategoriebyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await categorie.findOne({
      where: { id: id },
    });
    if (categories) {
      return res.status(200).json(categories);
    }
    return res
      .status(404)
      .send("Categorie with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const findProduitbycategorieid = async (req, res, next) => {
  try {
    const { id } = req.params;
console.log(id)

    const categories = await produit.findAll({
      where: { id_categorie: id },
    });
    
    if (categories) {
      return res.status(200).json(categories);
    }
    return res.
      status(404) 
      .send("Categorie with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
      
  }
};



 
    

module.exports = {
  findProduitbycategorieid,
  afficherCategorie,
  ajouterCategorie,
  modifierCategorie,
  supprimerCategorie,
  findCategoriebyid,
};
