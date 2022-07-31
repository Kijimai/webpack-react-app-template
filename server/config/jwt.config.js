const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const { User } = require('../models/user.models')

module.exports.authenticate = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Get user from the token without including the password
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Not authorized." })
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token found." })
  }
})

// OLD CODE
// jwt.verify(
//   req.cookies.userToken,
//   process.env.JWT_SECRET,
//   (err, payload) => {
//     if (err) {
//       res.status(401).json({ verified: false })
//     } else {
//       next()
//     }
//   }
// )
