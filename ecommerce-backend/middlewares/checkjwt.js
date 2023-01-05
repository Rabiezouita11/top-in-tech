const jwt = require('jsonwebtoken');




const checkjwt = (req, res, next) => {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');
    if (!claims) {
        return res.status(401).json({message: "invalid token"})
    }
    next();
};

module.exports ={
    checkjwt
}