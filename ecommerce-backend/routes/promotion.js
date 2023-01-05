var express = require('express');
var router = express.Router();
const Promotion = require('../controllers/PromotionAdmin/index');
router.get('/afficherPromotion', Promotion.afficherPromotion); // http://localhost:8080/promotion/afficherPromotion

router.get('/afficherproduitnotInPromotion', Promotion.afficherproduitnotInPromotion); // http://localhost:8080/promotion/afficherproduitnotInPromotion

router.put('/ajouterPromotion', Promotion.ajouterPromotion); // http://localhost:8080/promotion/ajouterPromotion
router.get('/afficherpromotionparId/:id', Promotion.afficherpromotionparId); // http://localhost:8080/promotion/afficherpromotionparId
module.exports = router;












