const Contest = require("../models/contest.model");
const Participant = require("../models/participant.model");
const {
  HttpErrorResponse,
  HttpApiResponse,
  HandleError,
} = require("../utils/utils");

// Create a new Contest

async function newContest(req, res) {
  const { title, descriptions, startTime, endTime, totalQuestions } = req.body;

  try {
    if (title && descriptions && startTime && endTime) {
      const newContest = await Contest.create({
        title,
        descriptions,
        startTime,
        endTime,
        totalQuestions,
      });
      return res.send(HttpApiResponse(newContest));
    } else {
      return res.send(
        HttpErrorResponse(
          "Invalid data received, please send title, descriptions, startTime, endTime"
        )
      );
    }
  } catch (err) {
    await HandleError("Contests", "newContest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

// Get all contest

async function getAllContest(req, res) {
  try {
    const allContests = await Contest.find({});
    if (allContests.length === 0) {
      return res.send(HttpErrorResponse("No active contest at the moment"));
    } else {
      return res.send(HttpApiResponse(allContests));
    }
  } catch (err) {
    await HandleError("Contest", "getAllContest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

async function getContestById(req, res) {
  try {
    const { contestId } = req.params;
    const contest = await Contest.findOne({ _id: contestId });
    if (!contest)
      res.send(
        HttpErrorResponse(new Error("No contest found for id: " + contestId))
      );
    return res.send(HttpApiResponse(contest));
  } catch (err) {
    await HandleError("Contest", "getAllContest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

// Get all user registered contest

async function getUserRegisteredContests(req, res) {
  try {
    const { userId } = req.params;
    const userRegisteredContests = await Participant.find({ userId: userId });

    const userContests = userRegisteredContests.map((contest) => {
      return contest.contestId;
    });

    const getContests = await Contest.find({ _id: { $in: userContests } });
    // console.log(getContests);
    return res.send(HttpApiResponse(getContests));
  } catch (err) {
    await HandleError("Contest", "getUserRegisteredContests", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

//Update the contest
async function updateContest(req, res) {
  const body = req.body;
  const { contestId } = req.params;
  try {
    var updatedContest = {};

    if (body.title) updatedContest.title = body.title;
    if (body.descriptions) updatedContest.descriptions = body.descriptions;
    if (body.startTime) updatedContest.startTime = body.startTime;
    if (body.endTime) updatedContest.endTime = body.endTime;

    updatedContest = { $set: updatedContest };

    const contest = await Contest.updateOne({ _id: contestId }, updatedContest);

    return res.send(HttpApiResponse(contest));
  } catch (err) {
    await HandleError("Contest", "UpdateContest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

//Delete a contest

async function deleteContest(req, res) {
  const { contestId } = req.params;
  try {
    const contest = await Contest.findOneAndRemove({ _id: contestId });
    return res.send(contest);
  } catch (err) {
    await HandleError("Contest", "deleteConstest", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

module.exports = {
  newContest,
  getAllContest,
  getUserRegisteredContests,
  updateContest,
  deleteContest,
  getContestById,
};
