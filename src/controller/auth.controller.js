require("dotenv").config();
const Participant = require("../models/participant.model");
const { createToken, validateToken } = require("../middlewares/jwt");
const User=require("../models/user.model")
const Contest=require("../models/contest.model")
const bcrypt = require("bcrypt");
const axios = require("axios");
// Login route
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    if (await bcrypt.compare(password, user.password)) {
      const token = await createToken(user);
      user.token = token;
      return res.json(user);
    }

    return res.status(404).send("Invalid Password");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// generate-users coming from xenia-registration
async function generateUser(req, res) {
  try {
    const { email, eventName, name, mobile } = req.body;

    // Find user
    const user = await User.findOne({ email });

    //Create a new user if already does not exists
    if (!user) {
      // Generate random password
      const password = Math.random().toString(36).slice(2, 10);

      // Encrypting password
      const encyptedPassword = await bcrypt.hash(password, 10);

      // Creating a user
      user = await User.create({
        name,
        email,
        password: encyptedPassword,
        phoneNumber: mobile,
      });
    }

    //Find contest ID
    const contest = await Contest.findOne({ title: eventName });
    if (!contest) res.status(404).send("No contest exist with such name");

    const contestId = contest._id;

    //Register the user to the event
    const findParticipant = await Participant.findOne({ "userId":user._id,"contestId":contestId });
    if (findParticipant) {
      console.log("Already participated in this contest");
      return false;
    }
    const createParticipant=await Participant.create({"userId":user._id,"contestId":contestId});

    if (createParticipant){
      await axios.post(process.env.sendEmail, { email: email, password: user.password, eventName: eventName }).then((response) => { console.log(`Mail Sent to ${email} with status: `+response.status); }, (error) => { console.log("Error while mail sending"); });

      return res.status(200).send("User created and registered successfully");
    }
      
    else return res.status(400).send("User has not been registered or participant already exist");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { login,generateUser };
