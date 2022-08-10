const Instruction=require("../models/intsructions.model")
const {
    HttpApiResponse,
    HandleError,
    HttpErrorResponse,
  } = require("../utils/utils");

async function getInstructions(req,res){
    const{contestid}=req.params;
    try {
        const getInstructions=await Instruction.findOne({"contestId":contestid});
        return res.status(200).send(HttpApiResponse(getInstructions));
    } catch (error) {
        await HandleError("Instruction", "getInstructions", err);
        res.status(400).send(HttpErrorResponse(err));
    }
}

async function createInstruction(req,res){
    const{contestId,instructions,pointPerQuestion,negativeMarking,time}=req.body;
    try {
        const createInstruction=await Instruction.create({
            contestId,
            instructions,
            pointPerQuestion,
            negativeMarking,
            time
        });
        return res.status(201).send(createInstruction);
    } catch (error) {
        return res.status(400).send(err.message);
    }
}

module.exports={getInstructions,createInstruction}