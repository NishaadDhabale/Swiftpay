const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("atak gaya janab")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({shit:"shit"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userid){
        req.userid = decoded.userid;
        console.log("wahwah")
        next();
        }
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}