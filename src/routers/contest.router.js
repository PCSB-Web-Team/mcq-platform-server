const contestRouter = require("express").Router();
contestRouter.get("/");
contestRouter.post("/createcontest");
module.exports = contestRouter;
