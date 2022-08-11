require("dotenv").config();
const Participant = require("../models/participant.model");
const { createToken, validateToken } = require("../middlewares/jwt");
const User = require("../models/user.model");
const Contest = require("../models/contest.model");
const bcrypt = require("bcrypt");
const axios = require("axios");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

// Login route
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send(HttpErrorResponse("User not found"));

    if (password == user.password) {
      const token = await createToken(user);
      user.token = token;
      return res.status(200).json(HttpApiResponse(user));
    }

    return res.status(400).send(HttpErrorResponse("Invalid Password"));
  } catch (err) {
    await HandleError("Auth", "login", err);
    res.status(400).send(HttpErrorResponse(err));
  }
}

// generate-users coming from xenia-registration
async function generateUser(req, res) {
  try {
    const { email, eventName, name, mobile } = req.body;

    if (!email || !eventName || !name || !mobile)
      throw new Error(
        "All the fields are required: name, email, eventName, mobile"
      );

    // Find user
    let user = await User.findOne({ email });

    //Create a new user if already does not exists
    if (!user) {
      // Generate random password
      const password = Math.random().toString(36).slice(2, 10);

      // Creating a user
      user = await User.create({
        name,
        email,
        password: password,
        phoneNumber: mobile,
      });
    }

    //Find contest ID
    const contest = await Contest.findOne({ title: eventName });
    if (!contest)
      return res
        .status(404)
        .send(HttpErrorResponse("No contest exist with such name"));

    const contestId = contest._id;

    //Register the user to the event
    const findParticipant = await Participant.findOne({
      userId: user._id,
      contestId: contestId,
    });

    if (findParticipant) {
      console.log("Already participated in this contest");
      return res.send(
        HttpErrorResponse("Already participated in this contest")
      );
    }

    const createParticipant = await Participant.create({
      userId: user._id,
      contestId: contestId,
      name,
    });

    if (createParticipant) {
      await axios
        .post(process.env.sendEmail, {
          email: email,
          password: user.password,
          eventName: eventName,
        })
        .then(
          (response) => {
            console.log(
              `Mail Sent to ${email} with status: ` + response.status
            );
          },
          (error) => {
            console.log("Error while mail sending");
          }
        );

      return res
        .status(200)
        .send(HttpApiResponse("User created and registered successfully"));
    } else
      return res
        .status(400)
        .send(
          HttpErrorResponse(
            "User has not been registered or participant already exist"
          )
        );
  } catch (err) {
    await HandleError("Auth", "generateUser", err);
    res.status(400).send(HttpErrorResponse(err.message));
  }
}

async function getProfile(req, res) {
  try {
    // Find user without sending password and version key (__v)
    const userId = req.user.id;
    console.log("[Auth] Get by user-id: " + req.user.id);
    const user = await User.findById(req.user.id).select("-password -__v");
    if (user) {
      res.send(HttpApiResponse(user));
    } else {
      res.status(404).send(HttpErrorResponse("No user exists with such id"));
    }
  } catch (err) {
    HandleError("Auth", "getProfile", err);
    res.status(400).send(HttpErrorResponse(err.message));
  }
}

module.exports = { login, generateUser, getProfile };
