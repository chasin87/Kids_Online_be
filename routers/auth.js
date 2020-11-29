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
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

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
        .send({ message: "Please provide both email and password" });
    }

    const gebruiker = await Gebruiker.findOne({ where: { email } });

    if (!gebruiker || !bcrypt.compareSync(password, gebruiker.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }
    console.log(gebruiker);
    delete gebruiker.dataValues["password"]; // don't send back the password hash
    const gebruikerToken = GebruikertoJWT({ gebruikerId: gebruiker.id });
    return res.status(200).send({ gebruikerToken, ...gebruiker.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { userName, email, password, level } = req.body;

  if (!userName || !email || !password || !level) {
    return res.status(400).send({
      message: "Please provide an userName, email, password and a level",
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

    const token = GebruikertoJWT({ userId: newUser.id });

    res.status(201).json({ GebruikerToken, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
