const Gebruiker = require("../models").gebruiker;
const { GebruikertoData } = require("./jwt");

async function gebruikerAuth(req, res, next) {
  const gebruikerAuth =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!gebruikerAuth || !gebruikerAuth[0] === "Bearer" || !gebruikerAuth[1]) {
    res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  if (gebruikerAuth && gebruikerAuth[0] === "Bearer" && gebruikerAuth[1]) {
    try {
      const data = GebruikertoData(gebruikerAuth[1]);
      const gebruiker = await Gebruiker.findByPk(data.gebruikerId);
      if (!gebruiker) {
        return next("User does not exist");
      } else {
        req.gebruiker = gebruiker;
        next();
      }
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
}

module.exports = gebruikerAuth;
