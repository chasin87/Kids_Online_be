const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
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

    delete gebruiker.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ gebruikerId: gebruiker.id });
    return res.status(200).send({ token, ...gebruiker.dataValues });
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

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
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
