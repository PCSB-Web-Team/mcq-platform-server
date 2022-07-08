const { newContest, getAllContest, updateContest, deleteContest } = require("../controller/contest.controller");
const contestRouter = require("express").Router();

contestRouter.get("/:userId");
contestRouter.post("/entercontest/:contestId/:userId");
contestRouter.post("/createcontest", newContest);
contestRouter.get("/", getAllContest);
contestRouter.put("/:contestId", updateContest);
contestRouter.delete("/:contestId", deleteContest);

module.exports = contestRouter;
