const {
  createquestion,
  getAllQuestions,
  getQuestionsForContest,
  updateQuestion,
  deleteQuestion,
} = require("../controller/question.controller");
const questionRouter = require("express").Router();

questionRouter.get("/", getAllQuestions); //get all questions
questionRouter.get("/:contestid", getQuestionsForContest);
questionRouter.get("/:contestid/:userid"); //get all questions for a particular user for particular contest
questionRouter.post("/createquestion", createquestion);
questionRouter.put("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);
module.exports = questionRouter;
