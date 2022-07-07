const contestRouter = require("express").Router();
contestRouter.get("/:userid");
contestRouter.post("/entercontest/:contestid/:userid");
contestRouter.post("/createcontest");
contestRouter.put("/:contestid");
contestRouter.delete("/:contestid");
module.exports = contestRouter;
