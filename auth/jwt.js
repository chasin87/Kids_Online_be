const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

function toJWT(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, jwtSecret);
}

function GebruikertoJWT(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "2h" });
}

function GebruikertoData(token) {
  return jwt.verify(GebruikerToken, jwtSecret);
}

module.exports = { toJWT, toData, GebruikertoJWT, GebruikertoData };
