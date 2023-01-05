const { user } = require("../../models");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  // how hash the password

  const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, 10);

  const newUser = await user
    .create({
      email: req.body.email,
      cin: req.body.cin,
      mot_de_passe: hashedPassword,
      nom: req.body.nom,
      prenom: req.body.prenom,
      role: "user",
      // how to get the image from the front end in the back end ?
      image: req.file.path,
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  if (!newUser) {
    return res.status(302).json({ message: "utilisateur existe deja" });
  }

  const result = await newUser.save();

  const { mot_de_passe, ...data } = await result.toJSON();

  return res.status(200).json({ message: "utilisateur cree avec succes" });
};

module.exports = {
  register,
};

// code json add user
