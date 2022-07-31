const { getInstructions, createInstruction } = require("../controller/instructions.controller");

const instructionRouter = require("express").Router();
instructionRouter.get("/:contestid",getInstructions); //get instructions for contest
instructionRouter.post("/createinstruction",createInstruction);
module.exports = instructionRouter;
