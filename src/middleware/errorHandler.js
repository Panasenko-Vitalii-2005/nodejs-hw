import createHttpError from 'http-errors';

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = createHttpError.isHttpError(err) ? err.status : 500;
  res.status(status).json({ message: err.message });
}
