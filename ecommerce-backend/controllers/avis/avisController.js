const { avis, user } = require("../../models");

const INAPPROPRIATE_WORDS = ["badword", "badword2", "badword3"]; // Add more words if you want to filter more words from the user input in the comment field of the form in the front end 

const ajouterAvis = async (req, res, next) => {
  console.log(req.body);
  const date = new Date();

  if (INAPPROPRIATE_WORDS.some((word) => req.body.comment.includes(word))) {
    return res
      .status(400)
      .json({ error: "Comment contains inappropriate words" });
  } else {
    avis
      .create({
        message: req.body.comment,
        id_user: req.body.id_user,
        date: date,
      })
      .then((avis) => {
        res.status(200).json(avis);
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  }
};
const afficheravis = async (req, res, next) => {
  avis
    .findAll({
      include: [
        {
          model: user,
          attributes: ["nom"],
        },
        {
          model: user,
          attributes: ["image"],
        },
        {
          model: user,
          attributes: ["id"],
        }
      ],
    })
    .then((avis) => {
      res.status(200).json(avis);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
const signalerAvis = async (req, res, next) => {
  avis  
    .update(
      {
        etat: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((avis) => {
      res.status(200).json(avis);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};


module.exports = {
  ajouterAvis,
  afficheravis,
  signalerAvis
};
