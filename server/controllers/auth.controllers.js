const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const errorHandler = require("../utils/error")

const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    await User.create({ username, email, password })
    res.status(201).send({ message: "User created successfully" })
  } catch (error) {
    next(error)
  }
}

const signin = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const validUser = await User.findOne({ username })
    if (!validUser) return next(errorHandler(401, "Wrong Credentials!"))

    const isValidPassword = bcrypt.compareSync(password, validUser.password)
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentials!"))

    const { password: hashedPassword, ...userDetails } = validUser._doc
    const token = jwt.sign(userDetails, process.env.JWT_SECRET)

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .send({ user: userDetails })
  } catch (error) {
    next(error)
  }
}

module.exports = { signup, signin }
