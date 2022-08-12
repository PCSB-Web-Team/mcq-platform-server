const Participant = require("../models/participant.model");
const Contest = require("../models/contest.model");
const moment = require("moment");
const {
  HttpErrorResponse,
  HttpApiResponse,
  HandleError,
} = require("../utils/utils");
const User = require("../models/user.model");
const Question = require("../models/question.model");

async function createParticipant(req, res) {
  const { userId, contestId } = req.body;
  try {
    if (!userId || !contestId) {
      throw new Error("userId and contestId are required");
    }

    const user = await User.findOne({ _id: userId });

    const contest = await Contest.findOne({ _id: contestId });

    if (!user) throw new Error("User not found for id: " + userId);

    if (!contest) throw new Error("Contest not found for id: " + contestId);

    const createParticipant = await Participant.create({
      userId,
      contestId,
      name: user.name,
      startTime: contest.startTime,
    });

    return res.send(HttpApiResponse(createParticipant));
  } catch (error) {
    await HandleError(error);
    return res.send(HttpErrorResponse(error.message));
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

    return res.send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "attemptQuestion", err);
    return res.send(HttpErrorResponse(error));
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
    return res.send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "bookmarkQuestion", err);
    return res.send(HttpErrorResponse(error));
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
    return res.send(HttpApiResponse(updateAttempted));
  } catch (error) {
    await HandleError("Participant", "clearQuestion", err);
    return res.send(HttpErrorResponse(error));
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
    return res.send(HttpApiResponse(submitTest));
  } catch (error) {
    await HandleError("Participant", "submitTest", err);
    return res.send(HttpErrorResponse(error));
  }
}

async function getUserParticipations(req, res) {
  const { userId } = req.params;
  try {
    const participations = await Participant.find({ userId });
    return res.send(HttpApiResponse(participations));
  } catch (err) {
    await HandleError("Participant", "getUserParticipations", err);
    return res.send(HttpErrorResponse(error));
  }
}

async function checkIfUserRegisteredForContest(req, res) {
  const { userId, contestId } = req.params;

  try {
    console.log(
      "\x1b[34m",
      "[Participant: checkIfUserRegisteredForContest]: " +
        JSON.stringify({ contestId, userId })
    );
    const participant = await Participant.findOne({ userId, contestId });
    if (participant) return res.send(HttpApiResponse(participant));
    else throw new Error("User is not registered for the events");
  } catch (err) {
    await HandleError("Participant", "checkIfUserRegisteredForContest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

async function enterContest(req, res) {
  const { contestId, userId } = req.params;

  try {
    const contestParticipant = await Participant.findOne({
      userId: userId,
      contestId: contestId,
    });

    //If not registered for the contest
    if (!contestParticipant) {
      throw new Error("User not registered");
    }

    const contest = await Contest.findOne({ contestId: contestId });

    //If entring first time (lenght of questions assigned to participants does not match to total questions defined for a contest)
    if (!contestParticipant.started) {
      let questions = await Question.find({ constestId: contestId });

      //Random question generation
      for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }

      questions = questions.slice(0, contest.totalQuestions);

      //Get the question_ids into an array
      const questionIds = questions.map((question) => {
        return { questionId: question._id };
      });

      //Push the ids into the participants array
      const participant = await Participant.findOneAndUpdate(
        { userId: userId, contestId: contestId },
        {
          $set: {
            started: true,
            questions: questionIds,
            startTime: new Date(),
          },
        }
      );

      return res.send(HttpApiResponse(participant));
    }

    //If not entered for the first time then send false
    return res.send(HttpApiResponse(contestParticipant));
  } catch (err) {
    await HandleError("Contest", "enterContest", err);
    return res.send(HttpErrorResponse(err.messages));
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
  enterContest,
};
