const Router = require("express").Router();
const auth = require("./auth.router");
const contest = require("./contest.router");
const question = require("./question.router");
const instructionRouter = require("./instructions.router");
const participant = require("./participant.router");
Router.use("/auth", auth);
Router.use("/contest", contest);
Router.use("/question", question);
Router.use("/instruction", instructionRouter);
Router.use("/participant", participant);
Router.get("", (req, res) => {
  res.send("Welcome to PCSB MCQ Platform");
});

module.exports = Router;
