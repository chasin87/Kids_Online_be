const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const { GebruikertoJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const gebruikerAuthMiddleware = require("../auth/gebruikerMiddleware");
const User = require("../models/").user;
const Gebruiker = require("../models/").gebruiker;

const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Vul een Email en Wachtwoord in" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "Gebruiker niet gevonden of wachtwoord onjuist",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Er is iets misgegaan, sorry" });
  }
});
//

router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  const user = await User.findOne({
    where: { email },
  });
  delete req.user.dataValues["password"];

  res.status(200).send({ ...req.user.dataValues, user });
});

router.get("/meGebruiker", gebruikerAuthMiddleware, async (req, res) => {
  // don't send back the password hash
  const gebruiker = await Gebruiker.findOne({
    where: { email },
  });

  delete req.gebruiker.dataValues["password"];

  res.status(200).send({ ...req.gebruiker.dataValues, gebruiker });
});

router.post("/gebruikerLogin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Vul een Email en Wachtwoord in" });
    }

    const gebruiker = await Gebruiker.findOne({ where: { email } });

    if (!gebruiker || !bcrypt.compareSync(password, gebruiker.password)) {
      return res.status(400).send({
        message: "Gebruiker niet gevonden of wachtwoord onjuist",
      });
    }

    delete gebruiker.dataValues["password"]; // don't send back the password hash
    const gebruikerToken = GebruikertoJWT({ gebruikerId: gebruiker.id });
    return res.status(200).send({ gebruikerToken, ...gebruiker.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Er is iets misgegaan, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { userName, email, password, level } = req.body;

  if (!userName || !email || !password || !level) {
    return res.status(400).send({
      message: "Vul alle velden in",
    });
  }

  try {
    const newUser = await Gebruiker.create({
      userName,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      level,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const gebruikerToken = GebruikertoJWT({ userId: newUser.id });

    res.status(201).json({ gebruikerToken, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "Er is een bestaand account bij deze e-mail" });
    }
    console.log(error);
    return res.status(400).send({ message: "Er is iets misgegaan, sorry" });
  }
});

module.exports = router;
