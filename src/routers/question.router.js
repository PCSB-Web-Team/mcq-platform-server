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

questionRouter.get("/:questionId", getQuestionByID);//working pkp
questionRouter.get("/contest/:contestId", getQuestionsForContest);//works pkp for all questions of a contest 
questionRouter.get("/:contestId/:userId", getUserQuestions); //get all questions for a particular user for particular contest
questionRouter.put("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);
questionRouter.post("/bulk", createQuestionsInBulk);
questionRouter.get("/all", getAllQuestions); //get all questions
questionRouter.post("/", createquestion);
module.exports = questionRouter;
