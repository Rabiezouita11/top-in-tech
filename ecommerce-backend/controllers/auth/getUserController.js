const {user} = require('../../models');
const jwt = require('jsonwebtoken');
const getUser = async (req, res, next) => {

    try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');
    if (!claims) {
        return res.status(401).json({message: "utilisateur non connecte"})
    }
    const userr = await user.findOne({where: {id: claims.id}});
    const {mot_de_passe, ...data} = await userr.toJSON();
    res.send(data);
}catch(err){
    return res.status(401).json({message: "utilisateur non connecte"})
}
next
};

module.exports = {
    getUser
};
