const jwt = require("jsonwebtoken"); 
const TOKEN_SECRET = require("../config");

const authRequired = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });
  
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
    });
  };
  
  const adminRequired = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) return res.status(401).json({ message: "Unauthorized, no token" });
  
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
  
      const userFound = await User.findById(user.id);
  
      if (!userFound || userFound.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      req.user = user;
      next();
    });
  };
  



module.exports =
    authRequired,
    adminRequired
