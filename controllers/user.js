const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const {setUser} = require('../service/auth')
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/"); // ✅ safe defaults
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
// const token = setUser(user);
// res.cookie("uid", token,{
//   domain: './piyushgarg.dev' //aage waele dot ka means subDovjort
// }) ;

//response way
const token = s

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};










// const {v4: uuidv4} = require('uuid')
// const User = require("../models/user");
// const {setUser} = require('../service/auth')
// async function handleUserSignup(req, res) {
//   const { name, email, password } = req.body;
//   await User.create({
//     name,
//     email,
//     password,
//   });
//   return res.redirect("/"); // ✅ safe defaults
// }

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({
//     email,
//     password,
//   });

//   if (!user)
//     return res.render("login", {
//       error: "Invalid Username or Password",
//     });
// const sessionId = uuidv4()

// setUser(sessionId,user);
// res.cookie("uid", sessionId) 
//   return res.redirect("/");
// }

// module.exports = {
//   handleUserSignup,
//   handleUserLogin,
// };
