require("dotenv").config();
const Participant = require("../models/participant.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/JWT");

async function login(req, res) {
  // const record = req.body;
  // const userExist = await User.findOne({ email: record.email }).lean();
  // if (!userExist) {
  //   return res.status(400).json({ msg: "Invalid Credentials" });
  // }
  // const isMatch = await bcrypt.compare(record.password, userExist.password);
  // if (!isMatch) {
  //   return res.status(400).json({ msg: "Invalid Credentials" });
  // }
  // const token = await generateToken(userExist);
  // res.json({
  //   ...userExist,
  //   token,
  // });
}

module.exports = { login };
