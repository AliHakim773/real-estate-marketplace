const express = require("express")
const {
  createListing,
  deleteListing,
} = require("../controllers/listing.controllers")
const router = express.Router()

router.post("/", createListing)
router.delete("/:id", deleteListing)

module.exports = router
