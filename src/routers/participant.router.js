const {
  attemptQuestion,
  createParticipant,
  bookmarkQuestion,
  clearQuestion,
  submitTest,
  getUserParticipations,
  checkIfUserRegisteredForContest,
} = require("../controller/participant.controller");

const participantRouter = require("express").Router();
participantRouter.get("/");
participantRouter.post("/", createParticipant);
participantRouter.get("/user/:userId", getUserParticipations);
participantRouter.get("/:userId/:contestId", checkIfUserRegisteredForContest);
participantRouter.put("/attempted", attemptQuestion);
participantRouter.put("/bookmark", bookmarkQuestion);
participantRouter.put("/clearattempted", clearQuestion);
participantRouter.put("/submit", submitTest);
module.exports = participantRouter;
