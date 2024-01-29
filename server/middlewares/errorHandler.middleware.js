const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"
  return res.status(statusCode).send({ success: false, message, statusCode })
}

module.exports = errorHandlerMiddleware
