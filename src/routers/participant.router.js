const {
  attemptQuestion,
  createParticipant,
  bookmarkQuestion,
  clearQuestion,
  submitTest,
  getUserParticipations,
  checkIfUserRegisteredForContest,
  enterContest,
  calculateScore,
  displayResult,
  checkParticipated,
} = require("../controller/participant.controller");

const participantRouter = require("express").Router();
participantRouter.get("/");
participantRouter.post("/", createParticipant);
participantRouter.get("/checkParticipated", checkParticipated);
participantRouter.get("/user/:userId", getUserParticipations);
participantRouter.get("/result/:contestId", displayResult);
participantRouter.get("/:userId/:contestId", checkIfUserRegisteredForContest);
participantRouter.post("/scores", calculateScore);
participantRouter.put("/attempted", attemptQuestion);
participantRouter.put("/bookmark", bookmarkQuestion);
participantRouter.put("/clearattempted", clearQuestion);
participantRouter.put("/submit", submitTest);
participantRouter.post("/entercontest/:contestId/:userId", enterContest);
module.exports = participantRouter;
