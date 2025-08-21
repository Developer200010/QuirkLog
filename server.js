const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");


// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js")
const postRoute = require("./routes/postRoute.js")
// Attach API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);


if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:5000",
      credentials: true,
    })
  );
  // Serve frontend
  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("/*any", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "frontend", "dist", "index.html"));
  });
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
