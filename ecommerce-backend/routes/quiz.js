var express = require('express');
var router = express.Router();

const Quiz = require('../controllers/QuizAdmin/index');

router.get('/checkreponsebyidquiz/:idUser/:idquiz', Quiz.checkreponsebyidquiz); // http://localhost:8080/quiz/findQuizbyIdquizandIduser/1/1

router.get('/findQuizbyIdquizandIduser/:idUser/:idquiz', Quiz.findQuizbyIdquizandIduser); // http://localhost:8080/quiz/findQuizbyIdquizandIduser/1/1
router.get('/findQuizbyId/:id', Quiz.findQuizbyId); // http://localhost:8080/quiz/findQuizbyId/1
router.post('/ajouterQuiz', Quiz.ajouterQuiz); // http://localhost:8080/quiz/ajouterQuiz
router.get ('/afficherQuiz', Quiz.afficherQuiz); // http://localhost:8080/quiz/afficherQuiz
router.delete('/deleteQuiz/:id', Quiz.deleteQuiz); // http://localhost:8080/quiz/deleteQuiz/1
router.put('/updateQuiz/:id', Quiz.updateQuiz); // http://localhost:8080/quiz/updateQuiz/1
router.post('/checkreponse', Quiz.checkreponse); // http://localhost:8080/quiz/checkreponse
// client













module.exports = router;
