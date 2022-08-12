const {
  newContest,
  getAllContest,
  getUserRegisteredContests,
  updateContest,
  deleteContest,
  getContestById,
} = require("../controller/contest.controller");
const contestRouter = require("express").Router();

contestRouter.get("/:contestId", getContestById);
contestRouter.post("/", newContest);
contestRouter.get("/", getAllContest);
contestRouter.put("/:contestId", updateContest);
contestRouter.delete("/:contestId", deleteContest);

module.exports = contestRouter;
