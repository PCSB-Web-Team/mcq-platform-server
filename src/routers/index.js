const Router = require("express").Router();
const auth = require("./auth.router");
const contest = require("./contest.router");
const question = require("./question.router");
const instructionRouter = require("./instructions.router");
Router.use("/auth", auth);
Router.use("/contest", contest);
Router.use("/question", question);
Router.use("/instruction", instructionRouter);
Router.get("", (req, res) => {
  res.send("Welcome to Xenia-Verse");
});

module.exports = Router;
