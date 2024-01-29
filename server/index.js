require("dotenv").config()
const cors = require("cors")
const express = require("express")
const connectToMongoDB = require("./configs/db.config")
const siteRoutes = require("./routes/index.routes")

const app = express()

// Initialize app routes
siteRoutes(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server listining on PORT: ", port)

  connectToMongoDB()
})
