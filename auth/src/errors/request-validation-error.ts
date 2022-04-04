import { ValidationError } from 'express-validator';

/**
 * App's custom version of the error object
 */
export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // when extending a class that is built-in class (Error)
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
