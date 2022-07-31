const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const instructionSchema=new Schema({
    contestId:{ type: Schema.Types.ObjectId, ref: "Contest" },
    instructions: [{ type: String }],
    pointPerQuestion: { type: Number },
    negativeMarking: { type: Number },
    time: { type: Number },
})

const Instruction = mongoose.model("Instruction", instructionSchema);

module.exports = Instruction;