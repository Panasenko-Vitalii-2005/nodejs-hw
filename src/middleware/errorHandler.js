import createHttpError from 'http-errors';

const { HttpError } = createHttpError;

/**
 * @param {unknown} err
 * @param {unknown} req
 * @param {{
 *   headersSent: boolean,
 *   status(code: number): { json(body: { message: string }): void },
 * }} res
 * @param {(err: unknown) => void} next
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message || err.name });
  }

  res.status(500).json({ message: 'Internal Server Error' });
}
