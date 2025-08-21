const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_URL);
      console.log("local database is connected...");
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("production database is connected....");
    }
  } catch (error) {
    console.log("database connection fail...." + error);
  }
};
module.exports = connectDB;