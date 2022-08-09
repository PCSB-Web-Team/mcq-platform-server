const {
  createquestion,
  getAllQuestions,
  getQuestionsForContest,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
} = require("../controller/question.controller");
const questionRouter = require("express").Router();

questionRouter.get("/contest/:contestId", getQuestionsForContest);
questionRouter.post("", createquestion);
questionRouter.get("/:contestId/:userId", getUserQuestions); //get all questions for a particular user for particular contest
questionRouter.get("/:questionId", getQuestion);
questionRouter.put("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);
questionRouter.get("/", getAllQuestions); //get all questions

module.exports = questionRouter;
