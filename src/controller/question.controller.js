const Participant = require("../models/participant.model");
const Question = require("../models/question.model");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

//create question
// async function createquestion(req, res) {
//   let data = ({
//     contestId,
//     title,
//     questionDescription,
//     options,
//     correctOption,
//     points,
//     imageLinks,
//   } = JSON.parse(req.body));
//   try {
//     if (!data.points) data.points = 1;
//     const createquestion = await Question.create({
//       contestId,
//       title,
//       questionDescription,
//       options,
//       correctOption,
//       points,
//       imageLinks,
//     });
//     return res.send(HttpApiResponse(createquestion));
//   } catch (err) {
//     await HandleError("Question", "createQuestion", err);
//     return res.send(HttpErrorResponse(err.message));
//   }
// }
async function createquestion(req, res) {
  const { contestId, title, questionDescription, options, correctOption, points, imageLinks } = req.body;

  try {
    if (!points) points = 1;  // Default points to 1 if not provided

    const createquestion = await Question.create({
      contestId,
      title,
      questionDescription,
      options,
      correctOption,
      points,
      imageLinks,
    });

    return res.send(HttpApiResponse(createquestion));
  } catch (err) {
    await HandleError("Question", "createQuestion", err);
    return res.send(HttpErrorResponse(err.message));
  }
}


//get question

async function getQuestionByID(req, res) {
  const { questionId } = req.params;
  try {
    const question = await Question.findOne(
      { _id: questionId },
      { correctOption: 0 }
    );
    if (!question) return res.send(HttpApiResponse(question));
    return res.send(HttpApiResponse(question));
  } catch (err) {
    await HandleError("Question", "getQuestion", err);
    return res.send(HttpErrorResponse(err.messages));
  }
}

//get all question

async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});
    console.log(allQuestions);
    return res.send(HttpApiResponse(allQuestions));
  } catch (err) {
    console.log(err);
    await HandleError("Question", "getAllQuestions", err);
    return res.send(HttpErrorResponse(err.message));
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
    return res.send(HttpApiResponse(getQuestionsForContest));
  } catch (err) {
    await HandleError("Question", "getQuestionsForContest", err);
    return res.send(HttpErrorResponse(err.message));
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
    if (body.imageLinks) updatedQuestion.imageLinks = body.imageLinks;

    const updateQuestion = await Question.updateOne(
      { _id: questionId },
      updatedQuestion
    );

    return res.send(HttpApiResponse(updateQuestion));
  } catch (err) {
    await HandleError("Question", "updateQuestion", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

//delete question

async function deleteQuestion(req, res) {
  const { questionId } = req.params;
  try {
    const deleteQuestion = await Question.findOneAndRemove({ _id: questionId });
    return res.send(HttpApiResponse(deleteQuestion));
  } catch (err) {
    await HandleError("Questions", "deleteQuestion", err);
    return res.send(HttpErrorResponse(err.message));
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
    if (!participant) return res.send({ msg: "no user found" });

    const questions = participant.questions;

    const questionId = questions.map((question) => {
      return question.questionId;
    });

    const participantQuestions = await Question.find({
      _id: { $in: questionId },
    });

    const Userquestions = participantQuestions.map((question) => ({
      _id: question._id,
      contestId: question.contestId,
      title: question.title,
      questionDescription: question.questionDescription,
      options: question.options,
      points: question.points,
    }));
    return res.send(HttpApiResponse(Userquestions));
  } catch (err) {
    await HandleError("Question", "getUserQuestions", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

async function createQuestionsInBulk(req, res) {
  try {
    const { questions, contestId } = req.body;
    if (!contestId) res.send("contestId not found");
    if (!questions) res.send("questions not found, should be an array");
    if (!questions.length) res.send("0 questions received");

    let list = questions.map((que) => {
      return { ...que, contestId };
    });

    // for (var i = 0; i < questions.length; i++) {
    //   const newQ = await Question.create({ ...questions[i], contestId });
    //   list.push(newQ);
    // }

    const response = await Question.insertMany(list);

    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err.message);
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
  createQuestionsInBulk,
};
