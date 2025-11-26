const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require("./connect");
// const{restrictToLoggedinUserOnly, checkAuth} = require('./middleware/auth');
const{restrictTo, checkForAuthentication} = require('./middleware/auth');
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/shorturl")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware to parse JSON and form-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)


// serve home at root

//for jw token
app.use("/url", restrictTo(["NORMAL"]) ,urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);
//for cookies
// app.use("/", checkAuth, staticRoute);
// app.use("/user",restrictToLoggedinUserOnly, userRoute);
// app.use("/url",urlRoute);

// test route
app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { id: null, urls: allUrls }); // ✅ id defined
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// redirect route for short links
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) return res.status(404).send("Short URL not found");

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
