const jwt = require("jsonwebtoken");
const secret = "piyush$123@$"; // you can use process.env.JWT_SECRET in production

// Generate JWT token
function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role || "user" },
    secret,
    { expiresIn: "1d" }
  );
}

// Verify JWT token
async function getUser(token) {
  try {
    return jwt.verify(token, secret); // returns decoded payload
  } catch (err) {
    return null; // invalid or expired token
  }
}

module.exports = { setUser, getUser };







//cookies
// const sessionIdToUserMap = new Map();
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user)
// }
// function getUser(id){
//     return sessionIdToUserMap.get(id)
// }
// module.exports = {
//     setUser,
//     getUser
// }