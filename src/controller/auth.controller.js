require("dotenv").config();
const nodemailer = require("nodemailer");
const Participant = require("../models/participant.model");
const { createToken, validateToken } = require("../middlewares/jwt");
const User = require("../models/user.model");
const Contest = require("../models/contest.model");
const bcrypt = require("bcrypt");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send credentials email
async function sendCredentials(email, name, password, eventName) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to ${eventName}`,
    text: `Hello ${name},\n\nYour account has been successfully created for the event: ${eventName}.\n\nYour login credentials:\n\nWebsite - https://mcq.pcsbxenia.in/\nEmail: ${email}\nPassword: ${password}\n\nBest Regards,\nEvent Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Mail Sent to ${email}`);
  } catch (error) {
    console.error("Error while sending email:", error);
  }
}

// Login route
async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log("[Auth] Login: " + email);

    const user = await User.findOne({ email });
    if (!user) return res.send(HttpErrorResponse("User not found"));

    if (password === user.password) {
      const token = await createToken(user);
      user.token = token;
      return res.json(HttpApiResponse(user));
    }
    return res.send(HttpErrorResponse("Invalid Password"));
  } catch (err) {
    await HandleError("Auth", "login", err);
    return res.send(HttpErrorResponse(err));
  }
}

// Generate user and send credentials
async function generateUser(req, res) {
  try {
    const { email, eventName, name, mobile } = req.body;
    if (!email || !eventName || !name || !mobile)
      throw new Error("All fields are required: name, email, eventName, mobile");

    let user = await User.findOne({ email });
    if (!user) {
      const password = Math.random().toString(36).slice(2, 10);
      user = await User.create({
        name,
        email,
        password,
        phoneNumber: mobile,
      });
    }

    const contest = await Contest.findOne({ title: eventName });
    if (!contest) return res.send(HttpErrorResponse("No contest exists with such name"));

    const contestId = contest._id;
    const findParticipant = await Participant.findOne({ userId: user._id, contestId });
    if (findParticipant) return res.send(HttpErrorResponse("Already participated in this contest"));

    const createParticipant = await Participant.create({
      userId: user._id,
      contestId,
      name,
    });

    if (createParticipant) {
      await sendCredentials(email, name, user.password, eventName);
      return res.send(HttpApiResponse("User created and registered successfully"));
    } else {
      return res.send(HttpErrorResponse("User registration failed"));
    }
  } catch (err) {
    await HandleError("Auth", "generateUser", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

// Get user profile
async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (user) return res.send(HttpApiResponse(user));
    return res.send(HttpErrorResponse("No user exists with such id"));
  } catch (err) {
    HandleError("Auth", "getProfile", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

module.exports = { login, generateUser, getProfile };
