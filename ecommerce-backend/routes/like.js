var express = require("express");

var router = express.Router();
const liekController    = require('../controllers/like/likeController');




router.post('/ajouterlike', liekController.ajouterlike); //   /like/ajouterlike
router.get('/getcountlikebyidproduit/:id', liekController.getcountlikebyidproduit); //   /like/getcountlikebyidproduit






module.exports = router;





























module.exports = router;