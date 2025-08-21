const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoute = require("./routes/authRoute.js");


// Attach API Routes
app.use("/api/auth", authRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
