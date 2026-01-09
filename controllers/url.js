const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user.id,
  });

  const allUrls = await URL.find({ createdBy: req.user.id });
  return res.render("home", { id: shortID, urls: allUrls });
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });

  if (!result) return res.status(404).json({ error: "Not found" });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
