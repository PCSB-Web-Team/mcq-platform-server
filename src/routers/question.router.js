const {
  createquestion,
  getAllQuestions,
  getQuestionsForContest,
  getQuestionByID,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
  createQuestionsInBulk,
} = require("../controller/question.controller");
const questionRouter = require("express").Router();

questionRouter.get("/:questionId", getQuestionByID);
questionRouter.get("/contest/:contestId", getQuestionsForContest);
questionRouter.get("/:contestId/:userId", getUserQuestions); //get all questions for a particular user for particular contest
questionRouter.put("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);
questionRouter.post("/bulk", createQuestionsInBulk);
questionRouter.get("/", getAllQuestions); //get all questions
questionRouter.post("/", createquestion);
module.exports = questionRouter;
