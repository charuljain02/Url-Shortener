const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) return res.redirect("/user/login");

  const decoded = getUser(token);
  if (!decoded) return res.redirect("/user/login");

  req.user = decoded;
  next();
}

async function checkAuth(req, res, next) {
  const token = req.cookies?.uid;
  if (token) {
    const decoded = getUser(token);
    req.user = decoded;
  }
  next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
