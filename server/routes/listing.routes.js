const express = require("express")
const { createListing } = require("../controllers/listing.controllers")
const router = express.Router()

router.post("/", createListing)

module.exports = router
