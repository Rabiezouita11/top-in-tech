const { contact } = require("../../models");

const ajouterContact = async (req, res, next) => {
  try {
    const contactss = req.body;

    const contacts = await contact.create({
      nom: contactss.nom,
      email: contactss.email,
      message: contactss.message,
    });
    return res.status(201).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ajouterContact,
};
