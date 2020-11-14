const { Router } = require("express");

const multer = require("multer");

const Quizes = require("../models/").quiz;
const router = new Router();
const upload = multer();

const Answers = require("../models/").answer;

router.get("/upload", async (req, res) => {
  try {
    const allQuizes = await Quizes.findAll();
    res.status(200).json(allQuizes);
  } catch (e) {
    console.log("error: ", e);
  }
});

router.get("/answer", async (req, res) => {
  try {
    const allAnswers = await Answers.findAll();
    res.status(200).json(allAnswers);
  } catch (e) {
    console.log("error: ", e);
  }
});

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

router.delete("/upload/:id", async (req, res) => {
  try {
    const question = await Quizes.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(question);
  } catch (e) {
    console.log("error: ", e);
  }
});

router.delete("/answer/:id", async (req, res) => {
  try {
    const answer = await Answers.destroy({
      where: { quizId: req.params.id },
    });
    res.status(200).json(answer);
  } catch (e) {
    console.log("error: ", e);
  }
});

// router.get("/upload/:id", async (req, res) => {
//   try {
//     const question = await Quizes.findOne({
//       where: { id: req.params.id },
//     });
//     res.status(200).json(question);
//   } catch (e) {
//     console.log("error: ", e);
//   }
// });
module.exports = router;
