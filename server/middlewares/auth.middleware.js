const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const errorHandler = require("../utils/error")

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return next(errorHandler(403, "Unauthorized"))
  else {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({ _id: decode._id }).select("-password")
      req.user = user
      next()
    } catch {
      next(errorHandler(403, "Token expired"))
    }
  }
}

module.exports = authMiddleware
