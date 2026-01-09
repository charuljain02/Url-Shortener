const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/user/login");

  const allUrls = await URL.find({ createdBy: req.user.id });
  return res.render("home", { urls: allUrls, id: null });
});

module.exports = router;
