const User = require("../models/user.model")

const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    await User.create({ username, email, password })
    res.status(201).send({ message: "User created successfully" })
  } catch (error) {
    next(error)
  }
}

module.exports = { signup }
