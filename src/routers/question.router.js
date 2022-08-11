const {
  createquestion,
  getAllQuestions,
  getQuestionsForContest,
  getQuestionByID,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
} = require("../controller/question.controller");
const questionRouter = require("express").Router();

questionRouter.get("/:contestId", getQuestionsForContest);
questionRouter.post("", createquestion);
questionRouter.get("/:contestId/:userId", getUserQuestions); //get all questions for a particular user for particular contest
questionRouter.get("/:questionId", getQuestionByID);
questionRouter.put("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);
questionRouter.get("/", getAllQuestions); //get all questions

module.exports = questionRouter;
