const jwt = require("jsonwebtoken");
const SECRET = "your_secret_key";

function setUser(user) {
  return jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
}

function getUser(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { setUser, getUser };
