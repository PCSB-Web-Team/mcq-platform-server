const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const contestSchema = new Schema({
  name: { type: String },
  descriptions: [{ type: String }],
  instructions: [{ type: String }],
  pointPerQuestion: { type: Number },
  totalQuestions: { type: Number },
  negativeMarking: { type: Number },
  time: { type: Number },
  startTime: { type: Number },
  endTime: { type: Number },
  status: { type: Number, default: 1 },
});

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
