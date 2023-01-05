const { quiz, reponse, coupon } = require("../../models");

const afficherQuiz = async (req, res, next) => {
  try {
    const quizs = await quiz.findAll();
    if (quizs) {
      return res.status(200).json(quizs);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const ajouterQuiz = async (req, res, next) => {
  try {
    let Quiz = req.body;
    const quizdejaexiste = await quiz.findOne({
      where: { titre_quiz: Quiz.titreQuiz },
    });
    if (quizdejaexiste) {
      return res.status(400).json({ error: "quiz deja existe" });
    }

    const newQuiz = await quiz.create({
      titre_quiz: Quiz.titreQuiz,
      option1: Quiz.option1,
      option2: Quiz.option2,
      option3: Quiz.option3,
      bonne_reponse: Quiz.bonnereponse,
    });
    if (newQuiz) {
      return res.status(201).json(newQuiz);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteQuiz = await quiz.destroy({
      where: { id: id },
    });
    if (deleteQuiz) {
      return res.status(200).json({ message: "quiz deleted" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    let Quiz = req.body;
    const { id } = req.params;
    console.log(Quiz);

    if (
      Quiz.titreQuiz == "" ||
      Quiz.option1 == "" ||
      Quiz.option2 == "" ||
      Quiz.option3 == "" ||
      Quiz.bonnereponse == ""
    ) {
      return res
        .status(400)
        .json({ error: "veuillez remplir tous les champs" });
    }
    const updateQuiz = await quiz.update(
      {
        titre_quiz: Quiz.titreQuiz,
        option1: Quiz.option1,
        option2: Quiz.option2,
        option3: Quiz.option3,
        bonne_reponse: Quiz.bonnereponse,
      },

      { where: { id: id } }
    );
    if (updateQuiz) {
      return res.status(200).json({ message: "quiz updated" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const findQuizbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quizz = await quiz.findOne({ where: { id: id } });
    if (quizz) {
      return res.status(200).json(quizz);
    }
  } catch (error) {
    console.log(error.message);
  }
};
const checkreponse = async (req, res, next) => {
  try {
    let Quiz = req.body;
    const reponseexiste = await reponse.findOne({
      where: { id_quiz: Quiz.id_quiz, id_user: Quiz.id_user },
    });
    if (reponseexiste) {
      return res.status(400).json({ error: "reponse deja existe" });
    }
    const newreponse = await reponse.create({
      reponse: Quiz.reponse,
      id_quiz: Quiz.id_quiz,
      id_user: Quiz.id_user,
    });
    if (newreponse) {
      // how check reponse  is correct or not
      const quizs = await quiz.findOne({ where: { id: Quiz.id_quiz } });
      if (quizs) {
        if (quizs.bonne_reponse == Quiz.reponse) {
          console.log("reponse correct");
          function between(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          }
          var someDate = new Date();
          someDate.setDate(someDate.getDate() + 1);
          var dateFormated = someDate.toISOString().substr(0, 10);

          const coupons = await coupon.create({
            prix: between(100, 999),
            etat: "en cours",
            date_expiration: dateFormated,
            id_user: Quiz.id_user,
          });

          return res.status(201).json({ message: "reponse correct" });
        } else {
          console.log("reponse incorrect");
          return res.status(201).json({ message: "reponse incorrect" });
        }
      }
      return res.status(201).json(newreponse);
    }
  } catch (error) {
    console.log(error.message);
  }
};



const findQuizbyIdquizandIduser = async (req, res, next) => {
  try {
    const { idUser, idquiz } = req.params;
    console.log(idUser, idquiz);
    const quizz = await reponse.findOne({
      where: { id_quiz: idquiz, id_user: idUser },
    });
    
    if (quizz) {
      return res.status(200).json(quizz);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const checkreponsebyidquiz = async (req, res, next) => {
  const { idquiz } = req.params;
  const { idUser } = req.params;
  const reponseexiste = await reponse.findOne({
    where: { id_quiz: idquiz, id_user: idUser },
  });
  const quizs = await quiz.findOne({ where: { id: idquiz } });
  if (quizs) {
    if (quizs.bonne_reponse == reponseexiste.reponse) {
      console.log("reponse correct");
     // how show last coupon  to user    
        
      return res.status(200).json({ message: "reponse correct"  } );
    } else {
      console.log("reponse incorrect");
      return res.status(200).json({ message: "reponse incorrect" ,correct :  quizs.bonne_reponse  } );
    }
  }

  

};



module.exports = {
  afficherQuiz,
  ajouterQuiz,
  deleteQuiz,
  updateQuiz,
  findQuizbyId,
  checkreponse,
  findQuizbyIdquizandIduser,
  checkreponsebyidquiz,
};
