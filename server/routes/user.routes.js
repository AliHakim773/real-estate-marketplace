const express = require("express")
const { updateUser } = require("../controllers/user.controllers")
const router = express.Router()

router.patch("/", updateUser)

module.exports = router
