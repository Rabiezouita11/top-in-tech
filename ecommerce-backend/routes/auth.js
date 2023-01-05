var express = require('express');
var router = express.Router();
const validate = require('../middlewares/validatorRegister')
const {uploadclient} = require('../middlewares/uploidClient')
const auth= require('../controllers/auth/index')
/* CREATE users listing. */

router.put('/RecupererCompte', auth.RecupererCompte); //path postman : http://localhost:3000/auth/RecupererCompte')

router.put('/delete',auth.supprimerCompteparid); // delete compte par id 
router.put('/change', auth.changerpassword);
router.post('/register', uploadclient, auth.register); //path postman : http://localhost:8080/auth/register
router.post('/login', auth.login); //path postman : http://localhost:8080/auth/login
router.get('/getUser', auth.getUser); //path postman : http://localhost:3000/auth/getUser
router.post('/logout', auth.logout); //path postman : http://localhost:3000/auth/logout
router.put('/UpdateProfileUser', uploadclient, auth.UpdateProfileUser); //path postman : http://localhost:3000/auth/UpdateProfileUser

 //path postman : http://localhost:3000/auth/UpdatePasswordUser

router.get('/getforgot-password', auth.getforgotPassword); //path postman : http://localhost:3000/auth/forgot-password
router.post('/postforgot-password', auth.postforgotPassword);// http://localhost:3000/auth/forgot-password
 // http://localhost:3000/auth/messageavecsucces

router.get('/resetpassword/:id/:token', auth.getresetPassword); //path postman : http://localhost:3000/auth/reset-password
router.post('/resetpassword/:id/:token', auth.postresetPassword);  // http://localhost:3000/auth/reset-password
module.exports = router;

