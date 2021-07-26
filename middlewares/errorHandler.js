const errorHandler = (err, req, res, next) => {
  if (
    (err.name && err.name === 'ValidationError') ||
    err.name === 'CastError'
  ) {
    return res.status(400).json({
      status: err.status || 400,
      errorName: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
  res.status(err.status || 500).json({
    status: err.status || 500,
    errorName: err.name,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
