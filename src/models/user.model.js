const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;