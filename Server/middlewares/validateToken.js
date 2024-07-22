const jwt = require("jsonwebtoken"); 
const TOKEN_SECRET = require("../config");

const authRequired = (req, res, next) =>{
    const {token} = req.cookies

    if (!token)
        return res.status(401).json({ message: "No token, authorization denied"});
    
    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if (err) return res.status(403).json( { message: "Invalid token"});
        req.user = user
    })

    next();
}



module.exports = authRequired