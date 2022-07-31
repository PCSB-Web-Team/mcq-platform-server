const { newContest, getAllContest, getUserRegisteredContests, enterContest, updateContest, deleteContest } = require("../controller/contest.controller");
const contestRouter = require("express").Router();

contestRouter.get("/:userId", getUserRegisteredContests);
contestRouter.post("/entercontest/:contestId/:userId", enterContest);
contestRouter.post("/createcontest", newContest);
contestRouter.get("/", getAllContest);
contestRouter.put("/:contestId", updateContest);
contestRouter.delete("/:contestId", deleteContest);

module.exports = contestRouter;
