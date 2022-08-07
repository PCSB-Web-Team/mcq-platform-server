const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const participantSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true},
  name: { type: String, required: true },
  contestId: { type: Schema.Types.ObjectId, ref: "Contest" },
  started: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  timeTaken: { type: Number },
  // timeTaken: {default: contestLength, currentTime - contestStartTime},
  questions: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question" },
      bookmark: {type:Boolean,default:false},
      attempted: { type: Number, default: null },
    },
  ],
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
