const Contest = require("../models/contest.model");
const Participant = require("../models/participant.model");
const Question = require("../models/question.model");

// Create a new Contest

async function newContest(req, res) {
  const { name, descriptions, startTime, endTime, totalQuestions } = req.body;

  try {
    if (name && descriptions && startTime && endTime) {
      const newContest = await Contest.create({
        name,
        descriptions,
        startTime,
        endTime,
        totalQuestions
      });
      return res.send(newContest);
    } else {
      return res
        .status(400)
        .send(
          "Invalid data received, please send name, descriptions, startTime, endTime"
        );
    }
  } catch (err) {
    return res.status(400).send(err.message);
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

// Get all user registered contest

async function getUserRegisteredContests(req, res) {
  try {
    const { userId } = req.params;
    const userRegisteredContests = await Participant.find({userId: userId});
    if (userRegisteredContests.length === 0) {
      res.status(404).send(userRegisteredContests);
    } else {
      res.status(200).send(userRegisteredContests);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

//Enter a contest

async function enterContest(req, res) {

  const { contestId, userId } = req.params;

  try {

    const participantContest = await Participant.findOne({userId: userId, contestId: contestId});
    
    //If not registered for the contest
    if(!participantContest) {
      return res.status(404).send({msg:"user not registered"});
    }

    const contest = await Contest.findOne({contestId: contestId});

    //If entring first time (lenght of questions assigned to participants does not match to total questions defined for a contest)
    if(participantContest.questions.length!=contest.totalQuestions){

      let questions = await Question.find({constestId: contestId});

      //Random question generation
      for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      questions = questions.slice(0, contest.totalQuestions);

      //Get the question_ids into an array
      const questionIds = questions.map((question)=>{return {questionId: question._id}})

      //Push the ids into the participants array
      const participant = await Participant.findOneAndUpdate({ userId: userId, contestId: contestId }, {
        $set:{questions: questionIds}
      });

      return res.status(200).send({msg:"User entring first time", firstEnter: true})
    }

    //If not entered for the first time then send false 
    return res.status(200).send({msg:"User already started", firstEnter: false})

  } catch (err) {
    res.status(400).send(err.message);
  }

}

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

module.exports = { newContest, getAllContest, getUserRegisteredContests, enterContest, updateContest, deleteContest };
