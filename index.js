const express = require("express");
const app = express();

/**
 * Config vars
 */

/**
 * Middlewares
 */

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

const loggerMiddleWare = require("morgan");
app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

const corsMiddleWare = require("cors");
app.use(corsMiddleWare());

const cors = require("cors");

var corsOptions = {
  origin: "http://kids-online.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

app.use(cors());

/**
 * Routes
 *
 */

// GET endpoint for testing purposes, can be removed
app.get("/", (req, res) => {
  res.send("Hi from express");
});

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

const { PORT } = require("./config/constants");

const uploadRouter = require("./routers/quizzes");
app.use("/", uploadRouter);

const answerRouter = require("./routers/quizzes");
app.use("/", answerRouter);

const authRouter = require("./routers/auth");
app.use("/", authRouter);

// Listen for connections on specified port (default is port 4000)
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
