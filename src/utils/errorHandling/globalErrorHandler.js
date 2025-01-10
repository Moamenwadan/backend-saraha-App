const globalErrorHandler = function (error, req, res, next) {
  const status = error.cause || 500;
  return res.status(status).json({
    status: "failed",
    error: error.message,
    stack: error.stack,
  });
};
export default globalErrorHandler;
