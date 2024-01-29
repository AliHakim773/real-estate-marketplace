const authRoutes = require("./auth.routes")

const siteRoutes = (app) => {
  // healthy check route
  app.get("/api/v1/healthy", (req, res) => res.status(200).send(true))

  // auth routes
  app.use("/api/v1/auth", authRoutes)
}

module.exports = siteRoutes
