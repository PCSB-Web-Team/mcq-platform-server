const Router = require("express").Router();
const auth = require("./auth.router");

Router.use("/auth", auth);

Router.get("", (req, res) => {
  res.send("Welcome to Xenia-Verse");
});

module.exports = Router;
