const express = require("express")
const { updateUser, deleteUser } = require("../controllers/user.controllers")
const router = express.Router()

router.patch("/", updateUser)
router.delete("/", deleteUser)

module.exports = router
