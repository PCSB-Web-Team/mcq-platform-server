const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const participantSchema = new Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  name: { type: String, required: true },
  contestId: { type: Schema.Types.ObjectId, ref: "Contest" },
  started: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  startTime: { type: Date, default: null },
  timeTaken: { type: Number, default: null },
  questions: {
    type: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question" },
        bookmark: { type: Boolean, default: false },
        attempted: { type: String, default: null },
      },
    ],
    default: [],
  },
  email: {
    type: String,
  },
  isSubmitted: {type: Boolean, default: false}
});

participantSchema.index({ userId: 1, contestId: 1 }, { unique: true });

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
