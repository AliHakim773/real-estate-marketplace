require("dotenv").config()
const express = require("express")
const connectToMongoDB = require("./configs/db.config")

const app = express()

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server listining on PORT: ", port)

  connectToMongoDB()
})
