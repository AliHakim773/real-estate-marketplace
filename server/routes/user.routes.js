const express = require("express")
const {
  updateUser,
  deleteUser,
  getUserListing,
} = require("../controllers/user.controllers")
const router = express.Router()

router.patch("/", updateUser)
router.delete("/", deleteUser)
router.get("/listing", getUserListing)

module.exports = router
