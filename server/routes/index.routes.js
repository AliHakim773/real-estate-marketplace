const authMiddleware = require("../middlewares/auth.middleware")
const authRouter = require("./auth.routes")
const userRouter = require("./user.routes")
const listingRouter = require("./listing.routes")

const siteRoutes = (app) => {
  // healthy check route
  app.get("/api/v1/healthy", (req, res) => res.status(200).send(true))

  // auth routes
  app.use("/api/v1/auth", authRouter)
  // user routes
  app.use("/api/v1/user", authMiddleware, userRouter)
  // listing routes
  app.use("/api/v1/listing", listingRouter)
}

module.exports = siteRoutes
