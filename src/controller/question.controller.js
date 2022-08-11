const Participant = require("../models/participant.model");
const Question = require("../models/question.model");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

//create question
async function createquestion(req, res) {
  let data = ({
    contestId,
    title,
    questionDescription,
    options,
    correctOption,
    points,
  } = req.body);
  try {
    if (!data.points) data.points = 1;
    const createquestion = await Question.create({
      contestId,
      title,
      questionDescription,
      options,
      correctOption,
      points
    });
    res.send(HttpApiResponse(createquestion));
  } catch (err) {
    await HandleError("Question", "createQuestion", err);
    return res.status(400).send(HttpErrorResponse(err.message));
  }
}

//get question

async function getQuestionByID(req, res) {
  console.log("hi");
  const { questionId } = req.params;
  try {
    const question = await Question.find({ '_id': questionId });
    console.log(question);
    if (!question) return res.status(404).send(question);
    return res.status(200).send(HttpApiResponse(question));
  } catch (err) {
    await HandleError("Question", "getQuestion", err);
    return res.status(404).send(HttpErrorResponse(err.messages));
  }
}

//get all question

async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});
    res.send(HttpApiResponse(allQuestions));
  } catch (err) {
    await HandleError("Question", "getAllQuestions", err);
    return res.status(404).send(HttpErrorResponse(err.message));
  }
}

//get all questions for particular contest

async function getQuestionsForContest(req, res) {
  const { contestId } = req.params;
  try {
    if (!contestId) throw new Error("contestId Invalid or not found");
    const getQuestionsForContest = await Question.find({
      contestId,
    });
    res.send(HttpApiResponse(getQuestionsForContest));
  } catch (err) {
    await HandleError("Question", "getQuestionsForContest", err);
    res.status(404).send(HttpErrorResponse(err.message));
  }
}

//update question

async function updateQuestion(req, res) {
  const body = req.body;
  const { questionId } = req.params;
  try {
    let updatedQuestion = {};

    if (body.title) updatedQuestion.title = body.title;
    if (body.questionDescription)
      updatedQuestion.questionDescription = body.questionDescription;
    if (body.options) updatedQuestion.options = body.options;
    if (body.correctOption) updatedQuestion.correctOption = body.correctOption;

    const updateQuestion = await Question.updateOne(
      { _id: questionId },
      updatedQuestion
    );

    res.send(HttpApiResponse(updateQuestion));
  } catch (err) {
    await HandleError("Question", "updateQuestion", err);
    res.status(400).send(HttpErrorResponse(err.message));
  }
}

//delete question

async function deleteQuestion(req, res) {
  const { questionId } = req.params;
  try {
    const deleteQuestion = await Question.findOneAndRemove({ _id: questionId });
    res.send(HttpApiResponse(deleteQuestion));
  } catch (err) {
    await HandleError("Questions", "deleteQuestion", err);
    res.status(400).send(HttpErrorResponse(err.message));
  }
}

//test this
async function getUserQuestions(req, res) {
  const { contestId, userId } = req.params;

  try {
    const participant = await Participant.findOne({
      contestId: contestId,
      userId: userId,
    });
    if (!participant) return res.status(404).send({ msg: "no user found" });

    const questions = participant.questions;

    const questionId = questions.map((question) => {
      return question.questionId;
    });

    const participantQuestions = await Question.find({
      _id: { $in: questionId },
    });

    const Userquestions=participantQuestions.map((question)=>({
      _id:question._id,
      contestId:question.contestId,
      title:question.title,
      questionDescription:question.questionDescription,
      options:question.options,
      points:question.points
    }))
    return res.status(200).send(HttpApiResponse(Userquestions));
  } catch (err) {
    await HandleError("Question", "getUserQuestions", err);
    return res.status(404).send(HttpErrorResponse(err.message));
  }
}

module.exports = {
  createquestion,
  getQuestionByID,
  getAllQuestions,
  getQuestionsForContest,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
};
