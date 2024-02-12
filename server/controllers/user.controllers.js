const Listing = require("../models/listing.model")
const User = require("../models/user.model")

const updateUser = async (req, res, next) => {
  const _id = req.user._id
  const { username, email, password, avatar } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $set: { username, email, password, avatar },
      },
      { new: true }
    )

    const { password: pass, ...userDetails } = user._doc

    res.status(200).send({ user: userDetails })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res) => {
  const _id = req.user._id
  try {
    await User.findByIdAndDelete(_id)

    res
      .clearCookie("access_token")
      .status(200)
      .send({ message: "User has been deleted!" })
  } catch (error) {
    return next(error)
  }
}

const getUserListing = async (req, res, next) => {
  const id = req.user._id
  try {
    const listing = await Listing.find({ user: id })
    return res.status(200).send(listing)
  } catch (error) {
    return next(error)
  }
}

module.exports = { updateUser, deleteUser, getUserListing }
