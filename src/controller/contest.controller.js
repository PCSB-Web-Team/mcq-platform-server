const Contest = require("../models/contest.model");
const Participant = require("../models/participant.model");

// Create a new Contest

async function newContest(req, res) {
  const { name, descriptions, startTime, endTime } = req.body;

  try {
    if (name && descriptions && startTime && endTime) {
      const newContest = await Contest.create({
        name,
        descriptions,
        startTime,
        endTime,
      });
      res.send(newContest);
    } else {
      res
        .status(400)
        .send(
          "Invalid data received, please send name, descriptions, startTime, endTime"
        );
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get all contest

async function getAllContest(req, res) {
  try {
    const allContests = await Contest.find({});
    if (allContests.length === 0) {
      res.status(404).send("No active contest at the moment");
    } else {
      res.send(allContests);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

// // Get all user registered contest

// async function getAllContest(req, res) {
//   try {
//     const allContests = await Contest.find({});
//     if (allContests.length === 0) {
//       res.status(404).send("No active contest at the moment");
//     } else {
//       res.send(allContests);
//     }
//   } catch (err) {
//     res.status(404).send(err.message);
//   }
// }

// //Enter a contest

// async function enterContest(req, res) {
//   const { userId, contestId } = req.params;

//   try {
//     let questions = await Questions.find({constestId: contestId});
//     questions = questions.sort(() => Math.random() - 0.5);
//     questions = questions.slice(0, 30);
//     const participant = await Participant.findOneAndUpdate({ userId: userId, contestId: contestId }, {
//       $set:{questions: questions}
//     });

//     res.send(contest);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// }

//Update the contest

async function updateContest(req, res) {
  const body = req.body;
  const { contestId } = req.params;
  try {
    var updatedContest = {};

    if (body.name) updatedContest.name = body.name;
    if (body.descriptions) updatedContest.descriptions = body.descriptions;
    if (body.startTime) updatedContest.startTime = body.startTime;
    if (body.endTime) updatedContest.endTime = body.endTime;

    updatedContest = { $set: updatedContest };

    const contest = await Contest.updateOne({ _id: contestId }, updatedContest);

    res.send(contest);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

//Delete a contest

async function deleteContest(req, res) {
  const { contestId } = req.params;
  try {
    const contest = await Contest.findOneAndRemove({ _id: contestId });
    res.send(contest);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { newContest, getAllContest, updateContest, deleteContest };
