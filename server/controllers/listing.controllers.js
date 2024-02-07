const Listing = require("../models/listing.model")

const createListing = async (req, res, next) => {
  const { _id } = req.user
  try {
    const listing = await Listing.create({ ...req.body, user: _id })
    return res.status(201).send(listing)
  } catch (error) {
    next(error)
  }
}

module.exports = { createListing }
