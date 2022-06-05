const questionRouter = require("express").Router();
questionRouter.get("/"); //get all questions
questionRouter.get("/:contestid/:userid"); //get all questions for a particular user for particular contest
questionRouter.post("/createquestion");
module.exports = questionRouter;
