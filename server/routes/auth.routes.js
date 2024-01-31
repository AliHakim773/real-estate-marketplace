const express = require("express")
const {
  signup,
  signin,
  google,
  signOut,
} = require("../controllers/auth.controllers")
const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signOut)
router.post("/google", google)

module.exports = router
