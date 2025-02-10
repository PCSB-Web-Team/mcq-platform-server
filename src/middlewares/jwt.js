require("dotenv").config();
const Participant = require("../models/participant.model");
const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");

async function createToken(user) {
  const token = await jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "1234",//updated
    {
      expiresIn: 6000000,
    }
  );
  return token;
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(400).json({ error: "User not Authenticated!" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "1234");//updated
    req.user = verified;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { createToken, validateToken };
