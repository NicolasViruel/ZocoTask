const jwt = require("jsonwebtoken");
const TOKEN_SECRET = require("../config");

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    //generamos el token
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

module.exports = createAccessToken;
