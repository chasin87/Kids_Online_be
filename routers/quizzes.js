const { Router } = require("express");

const multer = require("multer");

const Quizes = require("../models/").quiz;

const router = new Router();
const upload = multer();

router.get("/upload", async (req, res) => {
  try {
    const allQuizes = await Quizes.findAll();
    res.status(200).json(allQuizes);
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

module.exports = router;

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