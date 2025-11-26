const express = require("express");
const { handleUserSignup,handleUserLogin } = require("../controllers/user"); // ✅ fixed import
const router = express.Router();

// show signup page
router.get("/", (req, res) => {
  return res.render("signup");
});

// handle form submission
router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
