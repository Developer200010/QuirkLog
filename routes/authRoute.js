const router = require("express").Router();

const {registerController, loginController} = require("../controllers/authController.js")

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

module.exports = router;
