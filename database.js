const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (error) {
    console.log("Error connecting with database", error);
  }
};

module.exports = connectDB;
