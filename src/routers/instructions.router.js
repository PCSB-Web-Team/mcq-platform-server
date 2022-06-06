const instructionRouter = require("express").Router();
instructionRouter.get("/:contestid"); //get instructions for contest
instructionRouter.post("/createinstruction");
instructionRouter.post("/startcontest"); //send { contestId, userId, totalQuestions } backend generates random questions for userID
module.exports = instructionRouter;
