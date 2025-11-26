const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  full: { type: String, required: true },
  short: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  visitHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Url", urlSchema);







// const mongoose = require("mongoose");

// const urlSchema = new mongoose.Schema({
//   shortId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   redirectURL: {
//     type: String,
//     required: true,
//   },
//   visitHistory:{
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       'ref': "users",
//     },
//   } [{ timestamp: { type: Number } }],
// });

// const URL = mongoose.model("url", urlSchema);
// module.exports = URL;
