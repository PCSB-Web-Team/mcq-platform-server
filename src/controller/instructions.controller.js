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
        return res.send(HttpApiResponse(getInstructions));
    } catch (err) {
        await HandleError("Instruction", "getInstructions", err);
        return res.send(HttpErrorResponse(err));
    }
}

// async function createInstruction(req,res){
//     const{contestId,instructions,pointPerQuestion,negativeMarking,time}=req.body;
//     try {
//         const createInstruction=await Instruction.create({
//             contestId,
//             instructions,
//             pointPerQuestion,
//             negativeMarking,
//             time
//         });
//         return res.send(createInstruction);
//     } catch (error) {
//         return res.send(err.message);
//     }
// }


async function createInstruction(req, res) {
    const { contestId, instructions, pointPerQuestion, negativeMarking, time } = req.body;

    try {
        // Validate that contestId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contestId)) {
            return res.status(400).send(HttpErrorResponse("Invalid contestId format"));
        }

        // Create instruction
        const createInstruction = await Instruction.create({
            contestId,
            instructions,
            pointPerQuestion,
            negativeMarking,
            time
        });

        return res.send(HttpApiResponse(createInstruction));
    } catch (error) {
        await HandleError("Instruction", "createInstruction", error);
        return res.status(500).send(HttpErrorResponse(error.message));
    }
}

module.exports = { createInstruction };


module.exports={getInstructions,createInstruction}