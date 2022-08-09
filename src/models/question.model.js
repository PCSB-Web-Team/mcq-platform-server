const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest" },
  title: { type: String },
  questionDescription: [
    {
      questionType: { type: String },
      data: { type: String },
    },
  ],
  options: [
    {
      A: { type: String },
      B: { type: String },
      C: { type: String },
      D: { type: String },
    },
  ],
  correctOption: { type: String },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
