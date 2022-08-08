const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const errorSchema = new Schema({
  controller: String,
  method: String,
  message: String,
});

const ErrorLog = mongoose.model("Error", errorSchema);

module.exports = ErrorLog;
