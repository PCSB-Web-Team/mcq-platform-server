require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  console.log(process.env.mongoURI);
  mongoose
    .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log("MongoDB Connected");
    });
};
module.exports = connectDB;
