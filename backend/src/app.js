const fs = require("node:fs");
const path = require("node:path");
const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const router = express.Router();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const eventRouter = require("./routes/eventRouter");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/event", eventRouter);
app.use(router);
app.use("/api", router);

app.use(express.static(path.join(__dirname, "../public")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
