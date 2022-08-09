const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require("moment");

const contestSchema = new Schema({
  title: { type: String },
  descriptions: [{ type: String }],
  // instructions: [{ type: String }],
  // pointPerQuestion: { type: Number },
  totalQuestions: { type: Number },
  // negativeMarking: { type: Number },
  // time: { type: Number },
  startTime: { type: Date },
  endTime: { type: Date },
  logo: { type: String },
  // status: { type: Number, default: 1 },
});

contestSchema.set("toObject", { virtuals: true });
contestSchema.set("toJSON", { virtuals: true });

contestSchema.virtual("status").get(function () {
  let status = {};

  var now = moment(new Date());
  var start = moment(this.startTime);
  var end = moment(this.endTime);

  const startDiff = moment.duration(start.diff(now));
  const endDiff = moment.duration(end.diff(now));
  const startSeconds = startDiff.asSeconds();
  const endSeconds = endDiff.asSeconds();

  if (startSeconds > 0) {
    status.description = "NOTSTARTED";
    status.time = startSeconds;
  } else if (startSeconds < 0 && endSeconds < 0) {
    status.description = "ENDED";
    status.time = 0;
  } else {
    status.description = "RUNNING";
    status.time = endSeconds;
  }

  return status;
});

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
