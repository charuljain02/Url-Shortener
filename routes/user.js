const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

// Signup route
router.get("/signup", (req, res) => {
  res.render("signup"); // render signup page
});

router.post("/signup", handleUserSignup);

// Login route
router.get("/login", (req, res) => {
  res.render("login"); // render login page
});

router.post("/login", handleUserLogin);

module.exports = router;
