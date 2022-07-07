const instructionRouter = require("express").Router();
instructionRouter.get("/:contestid/:userid"); //get instructions for contest
instructionRouter.post("/createinstruction");
module.exports = instructionRouter;
