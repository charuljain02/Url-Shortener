const { getUser } = require("../service/auth");

// Attach user to req.user if valid JWT token exists
async function checkAuthentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  req.user = null;

  if (!authHeader || !authHeader.startsWith("Bearer ")) return next();

  const token = authHeader.split(" ")[1];
  const user = await getUser(token);
  req.user = user || null;

  next();
}

// Role-based access middleware
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.status(403).send("Unauthorized");
    next();
  };
}

module.exports = { checkAuthentication, restrictTo };






// const { getUser } = require('../service/auth');

// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.headers["authorization"];
    
// console.log(req.headers);

//     if (!userUid) return res.redirect("/login");
//     const token = userUid.split("Bearer")[0]; // "Bearer [23u123uakjnrar]"
//     const user = getUser(token); 

//     if (!user) return res.redirect("/login");
    
//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){

// const userUid = req.cookies?.uid; 

//     const user = getUser(userUid); 
    
//     req.user = user;
//     next();

// }
// module.exports = {
//     restrictToLoggedinUserOnly,checkAuth,
// };














//cookies are used



// const { getUser } = require('../service/auth');

// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid; // ✅ fixed: req.cookie → req.cookies and removed extra '?'
//     if (!userUid) return res.redirect("/login");

//     const user = getUser(userUid); // ✅ fixed: 'userid' → 'userUid'

//     if (!user) return res.redirect("/login");
    
//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){

// const userUid = req.cookies?.uid; 

//     const user = getUser(userUid); 
    
//     req.user = user;
//     next();

// }
// module.exports = {
//     restrictToLoggedinUserOnly,checkAuth,
// };
