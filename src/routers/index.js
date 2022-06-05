const Router = require("express").Router();
const auth = require("./auth.router");
const contest = require("./contest.router");
Router.use("/auth", auth);
Router.use("/contest", contest);
Router.get("", (req, res) => {
  res.send("Welcome to Xenia-Verse");
});

module.exports = Router;
