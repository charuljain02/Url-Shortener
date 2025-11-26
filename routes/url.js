const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handkeGetAnalytics,
} = require("../controllers/url");
const URL = require("../models/url");

// Home route — show all saved URLs
router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", { id: null, urls: allurls }); // ✅ id added
});

router.post("/", handleGenerateNewShortURL);

// Analytics route
router.get("/analytics/:shortId", handkeGetAnalytics);

module.exports = router;
