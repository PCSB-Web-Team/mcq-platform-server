const {
  attemptQuestion,
  createParticipant,
  bookmarkQuestion,
  clearQuestion,
  submitTest,
  getUserParticipations,
} = require("../controller/participant.controller");

const participantRouter = require("express").Router();
participantRouter.get("/");
// participantRouter.get("/user/:userId", getUserParticipations);
participantRouter.post("/", createParticipant);
participantRouter.put("/attempted", attemptQuestion);
participantRouter.put("/bookmark", bookmarkQuestion);
participantRouter.put("/clearattempted", clearQuestion);
participantRouter.put("/submit", submitTest);
module.exports = participantRouter;
