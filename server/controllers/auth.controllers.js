const User = require("../models/user.model")

const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    await User.create({ username, email, password })
    res.status(200).send({ message: "User created successfully" })
  } catch (error) {
    res.status(500).send({ error })
  }
}

module.exports = { signup }
