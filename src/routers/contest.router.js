const {
  newContest,
  getAllContest,
  getUserRegisteredContests,
  updateContest,
  deleteContest,
} = require("../controller/contest.controller");
const contestRouter = require("express").Router();

contestRouter.get("/:userId", getUserRegisteredContests);
contestRouter.post("/", newContest);
contestRouter.get("/", getAllContest);
contestRouter.put("/:contestId", updateContest);
contestRouter.delete("/:contestId", deleteContest);

module.exports = contestRouter;
