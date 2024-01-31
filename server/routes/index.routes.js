const authMiddleware = require("../middlewares/auth.middleware")
const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")

const siteRoutes = (app) => {
  // healthy check route
  app.get("/api/v1/healthy", (req, res) => res.status(200).send(true))

  // auth routes
  app.use("/api/v1/auth", authRoutes)
  // user routes
  app.use("/api/v1/user", authMiddleware, userRoutes)
}

module.exports = siteRoutes
