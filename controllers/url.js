const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortID = shortid.generate();

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
   
    });

    const allurls = await URL.find({});
    return res.render("home", { id: shortID, urls: allurls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handkeGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) return res.status(404).json({ error: "Not found" });

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { handleGenerateNewShortURL, handkeGetAnalytics };
