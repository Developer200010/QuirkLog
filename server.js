const express = require("express");
const app = express();
require("dotenv").config();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js")

// Attach API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
