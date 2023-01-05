const { contact } = require("../../models");


const affichercontact = async (req, res, next) => {
    try {
        const contacts = await contact.findAll();
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};









module.exports = {
    affichercontact
  
  };
  



