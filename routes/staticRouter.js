const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { checkAuthentication } = require("../middleware/auth");

// Home page (protected)
router.get("/", checkAuthentication, async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { id: null, urls: allurls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Signup & login pages
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));

module.exports = router;














// const express = require("express");
// const router = express.Router();
// const URL = require("../models/url");

// router.get("/", async (req, res) => {
//   try {
//     if(!req.user) return res.redirect('/login');
//     const allurls = await URL.find({createdBy: req.user._id});
//     return res.render("home", { id: null, urls: allurls }); // ✅ id defined
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// router.get("/signup", (req, res) => {
//   return res.render("signup");
// });
// router.get("/login", (req, res) => {
//   return res.render("login");
// });

// module.exports = router;

