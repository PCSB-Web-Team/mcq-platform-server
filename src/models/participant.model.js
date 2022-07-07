const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const participantSchema = new Schema({
  userId: Schema.Types.ObjectId,
  contestId: { type: Schema.Types.ObjectId, ref: "Contest" },
  started: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  timeTaken: { type: Number },
  // timeTaken: {default: contestLength, currentTime - contestStartTime},
  questions: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question" },
      bookmark: Boolean,
      attempted: { type: Number, default: null },
    },
  ],
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
