const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    return res.redirect("/user/login");
  } catch (err) {
    if (err.code === 11000) {
      return res.render("signup", { error: "Email already registered" });
    }
    return res.status(500).send("Server error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.render("login", { error: "Email not registered" });
  if (user.password !== password)
    return res.render("login", { error: "Wrong password" });

  const token = setUser(user);
  res.cookie("uid", token, { httpOnly: true });

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
