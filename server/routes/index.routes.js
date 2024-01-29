const siteRoutes = (app) => {
  app.get("/healthy", (req, res) => res.status(200).send(true))
}

module.exports = siteRoutes
