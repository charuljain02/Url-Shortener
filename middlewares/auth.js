const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.redirect("/login");
  }

  const user = await getUser(userUid);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  if (userUid) {
    const user = await getUser(userUid);
    req.user = user;
  } else {
    req.user = null;
  }

  next();
}

async function redirectIfLoggedIn(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return next();

  const user = await getUser(userUid);
  if (user) {
    return res.redirect("/");
  }

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
  redirectIfLoggedIn,
};
