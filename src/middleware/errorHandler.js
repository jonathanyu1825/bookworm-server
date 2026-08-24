export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.expose ? err.message : "Something went wrong";
  console.error(err);

  res.status(status).json({
    error: {
      message,
      status,
      field: err.field,
    },
  });
}
