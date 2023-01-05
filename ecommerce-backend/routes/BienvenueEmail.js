var express = require('express');
var router = express.Router();
const BienvenueEmail = require('../controllers/BienvenueEmail/email');

router.post('/', BienvenueEmail.sendemail);








module.exports = router;