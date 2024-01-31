require("dotenv").config()
const cors = require("cors")
const express = require("express")
const connectToMongoDB = require("./configs/db.config")
const siteRoutes = require("./routes/index.routes")
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware")
const cookieParser = require("cookie-parser")

const app = express()

const allowedOrigins = ["http://localhost:5173"]

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

// Initialize app routes
siteRoutes(app)

// Add global error handler
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server listining on PORT: ", port)

  connectToMongoDB()
})
