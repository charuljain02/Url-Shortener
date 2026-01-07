const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8001;

// 🔹 Connect to MongoDB
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🔹 View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// 🔹 Attach user if logged in (does NOT block)
app.use(checkAuth);

// ================= PUBLIC ROUTES =================
app.use("/user", userRoute);   // POST /user/login , /user/signup
app.use("/", staticRoute);     // GET /login , /signup , /

// ================= PROTECTED ROUTES =================
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

// 🔹 Redirect short URLs (PUBLIC)
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) return res.status(404).send("Short URL not found");
    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 🔹 Start server
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
