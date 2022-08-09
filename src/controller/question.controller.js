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
    });
    res.send(HttpApiResponse(createquestion));
  } catch (err) {
    HandleError("Question", "createQuestion", err);
    res.status(400).send(HttpErrorResponse(err.message));
  }
}

//get question

async function getQuestion(req, res) {
  const { questionId } = req.params;

  try {
    const question = await Question.findOne({ _id: questionId });
    if (!question) return res.status(404).send(question);
    return res.status(200).send(question);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

//get all question

async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});

    res.send(allQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

//get all questions for particular contest

async function getQuestionsForContest(req, res) {
  try {
    const getQuestionsForContest = await Question.find({
      contestId: req.params.contestid,
    });
    res.send(getQuestionsForContest);
  } catch (err) {
    res.status(404).send(err.message);
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

    res.send(updateQuestion);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

//delete question

async function deleteQuestion(req, res) {
  const { questionId } = req.params;
  try {
    const deleteQuestion = await Question.findOneAndRemove({ _id: questionId });
    res.send(deleteQuestion);
  } catch (err) {
    res.status(400).send(err.message);
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

    return res.status(200).send(participantQuestions);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

module.exports = {
  createquestion,
  getQuestion,
  getAllQuestions,
  getQuestionsForContest,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
};
