const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const multer = require("multer");

const Quizes = require("../models/").quiz;

const router = new Router();
const upload = multer();

router.post("/upload", upload.single("questionImage"), async function (
  req,
  res,
  next
) {
  const file = req.body.questionImage;
  const question = req.body;

  try {
    const newQuestion = await Quizes.create(question, file);
    console.log(newQuestion.dataValues);
    res
      .status(201)
      .send({ message: "Create newQuestion", question: newQuestion });
  } catch (error) {
    console.log("error: ", error);
  }
});

router.get("/upload/:id", async (req, res) => {
  try {
    const question = await Quizes.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(question);
  } catch (e) {
    console.log("error: ", e);
  }
});

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

module.exports = router;
