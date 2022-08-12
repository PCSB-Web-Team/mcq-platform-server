const Participant = require("../models/participant.model");
const Contest = require("../models/contest.model");
const moment = require("moment");
const {
  HttpErrorResponse,
  HttpApiResponse,
  HandleError,
} = require("../utils/utils");
const User = require("../models/user.model");

async function createParticipant(req, res) {
  const { userId, contestId } = req.body;
  try {
    if (!userId || !contestId) {
      throw new Error("userId and contestId are required");
    }

    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("User not found for id: " + userId);

    const createParticipant = await Participant.create({
      userId,
      contestId,
      name: user.name,
    });

    return res.status(201).send(HttpApiResponse(createParticipant));
  } catch (error) {
    await HandleError(error);
    return res.status(400).send(HttpErrorResponse(error.message));
  }
}

async function attemptQuestion(req, res) {
  const { questionId, attempted, userId, contestId } = req.body;
  try {
    filter = {
      $and: [{ userId: userId }, { contestId: contestId }],
      "questions.questionId": questionId,
    };
    update = { $set: { "questions.$.attempted": attempted } };
    const updateAttempted = await Participant.updateOne(filter, update);

    return res.status(200).send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "attemptQuestion", err);
    return res.status(400).send(HttpErrorResponse(error));
  }
}

async function bookmarkQuestion(req, res) {
  const { questionId, userId, contestId, bookmark } = req.body;
  try {
    filter = {
      $and: [{ userId: userId }, { contestId: contestId }],
      "questions.questionId": questionId,
    };
    update = { $set: { "questions.$.bookmark": bookmark } };
    const updateAttempted = await Participant.updateOne(filter, update);
    return res.status(200).send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "bookmarkQuestion", err);
    return res.status(400).send(HttpErrorResponse(error));
  }
}

async function clearQuestion(req, res) {
  const { questionId, userId, contestId } = req.body;
  try {
    filter = {
      $and: [{ userId: userId }, { contestId: contestId }],
      "questions.questionId": questionId,
    };
    update = { $set: { "questions.$.attempted": null } };
    const updateAttempted = await Participant.updateOne(filter, update);
    return res.status(200).send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "clearQuestion", err);
    return res.status(400).send(HttpErrorResponse(error));
  }
}

async function submitTest(req, res) {
  const { userId, contestId } = req.body;
  try {
    const findContest = await Contest.findById(contestId);
    var startTime = moment(findContest.startTime);
    var now = moment(new Date());
    var timeTaken = moment.duration(now.diff(startTime));
    var timeTakenSeconds = timeTaken.asSeconds();

    filter = { $and: [{ userId: userId }, { contestId: contestId }] };
    update = { timeTaken: timeTakenSeconds };
    const submitTest = await Participant.updateOne(filter, update);
    return res.status(200).send(HttpApiResponse(submitTest));
  } catch (error) {
    await HandleError("Participant", "submitTest", err);
    return res.status(400).send(HttpErrorResponse(error));
  }
}

async function getUserParticipations(req, res) {
  const { userId } = req.params;
  try {
    const participations = await Participant.find({ userId });
    return res.send(HttpApiResponse(participations));
  } catch (err) {
    await HandleError("Participant", "getUserParticipations", err);
    return res.status(400).send(HttpErrorResponse(error));
  }
}

async function checkIfUserRegisteredForContest(req, res) {
  const { userId, contestId } = req.params;

  try {
    console.log(
      "[Participant: checkIfUserRegisteredForContest]: " +
        JSON.stringify({ contestId, userId })
    );
    const participant = await Participant.find({ userId, contestId });
    return res.send(HttpApiResponse(participant.length > 0));
  } catch (err) {
    await HandleError("Participant", "checkIfUserRegisteredForContest", err);
    res.send(HttpErrorResponse(err.message));
  }
}

module.exports = {
  attemptQuestion,
  createParticipant,
  bookmarkQuestion,
  clearQuestion,
  submitTest,
  getUserParticipations,
  checkIfUserRegisteredForContest,
};
