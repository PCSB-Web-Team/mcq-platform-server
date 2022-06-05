const contestRouter = require("express").Router();
contestRouter.get("/getcontest/:id");
contestRouter.post("/getcontest/:id");
module.exports = contestRouter;
