const {register}= require('./registerController')
const {login, logout}= require("./loginController")
const {getUser}= require("./getUserController")
const {UpdateProfileUser,changerpassword}= require("./UpdateProfileUser")
const {supprimerCompteparid}= require("./deleteCompte");
const {getforgotPassword, getresetPassword,postresetPassword,postforgotPassword}= require("./forgetPassword")
const {RecupererCompte}= require("./RecupererCompte")
module.exports={
    register,
    login,
    getUser,
    logout,
    UpdateProfileUser,
    getforgotPassword,
    postforgotPassword,
    getresetPassword,
    postresetPassword,
    postforgotPassword,
    supprimerCompteparid,
    changerpassword,
    RecupererCompte

}