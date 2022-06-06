const contestRouter = require("express").Router();
contestRouter.get("/");
contestRouter.post("/createcontest");
contestRouter.put("/:contestid");
contestRouter.delete("/:contestid");
module.exports = contestRouter;
