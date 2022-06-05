const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  contestId: { type: Schema.Types.ObjectId, ref: "Contest" },
  questionDescription: [
    {
      questionType: { type: String },
      data: { type: String },
    },
  ],
  options: [
    {
      questionType: { type: String },
      data: { type: String },
    },
  ],
  correctOption: { type: Number },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
