import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DataBaseConnectionError } from '../errors/database-connection-error';

/**
 * Handles all errors thrown in the application as they will be caught by express and handled
 * via this middleware.
 * This middleware require exactly these 4 arguments so DO NOT EDIT.
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
  if (error instanceof RequestValidationError) {
    // returning a consistent error format for the entire application
    // converting the error type from express-validator's ValidationError
    // to our custom { errors: { message: string field?: string }[] }
    const formattedErrors = error.errors.map((item) => ({
      message: item.msg,
      field: item?.param,
    }));
    console.log(JSON.stringify(formattedErrors, null, 2));
    return res.status(400).json(formattedErrors);
  }
  if (error instanceof DataBaseConnectionError) {
    console.log('Error was an instance of DataBaseConnectionError');
    return res.status(500).json(error);
  }
  res.status(400).send(error.message); // error.message will be the error thrown
};
