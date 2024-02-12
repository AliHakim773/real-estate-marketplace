const Listing = require("../models/listing.model")
const errorHandler = require("../utils/error")

const createListing = async (req, res, next) => {
  const { _id } = req.user
  try {
    const listing = await Listing.create({ ...req.body, user: _id })
    return res.status(201).send(listing)
  } catch (error) {
    next(error)
  }
}

const deleteListing = async (req, res, next) => {
  const _id = req.params.id
  try {
    if (!(await Listing.findById(_id))) {
      next(errorHandler(404, "Item not found"))
    }

    await Listing.findByIdAndDelete(_id)
    return res.status(201).send({ message: "deleted successfully" })
  } catch (error) {
    next(error)
  }
}

module.exports = { createListing, deleteListing }
