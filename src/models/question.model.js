const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  contestId: { type: Schema.Types.ObjectId },
  title: { type: String },
  questionDescription: [
    {
      questionType: { type: String },
      data: { type: String },
    },
  ],
  options: {type: [{ type: String }],default: [],},
  correctOption: { type: String, default: null },
  points: { type: Number, default: 1 },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
