import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

/**
 * Handles all errors thrown in the application as they will be caught by express and handled
 * via this middleware automatically (if error is thrown anywhere in the application).
 *
 * This middleware require exactly these 4 arguments to be considered a middelware by express so DO NOT EDIT.
 * @param error - incoming error
 * @param req - request object passed in by express
 * @param res - response object passed in by express
 * @param next - next function passed by express
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // this single custom abstract class covers for all types of custom errors for the app
  if (error instanceof CustomError) {
    return res
      .status(error.STATUS_CODE)
      .json({ errors: error.serializeErrors() });
  }

  res.status(400).send(error.message); // error.message will be the error thrown
};
