import { ValidationError } from 'express-validator';
// import { CustomError } from '../interface/error-interface';
import { CustomError } from './custom-error';

/**
 * App's custom version of the error object
 */
// temp removed interface in favor of abstract classes to be able to use "instanceof"
// export class RequestValidationError extends Error implements CustomError {
export class RequestValidationError extends CustomError {
  STATUS_CODE = 400;

  constructor(public errors: ValidationError[]) {
    super('Request validation error occured.');

    // when extending a class that is built-in class (Error)
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  // method for extracting this error type's specific error+status
  serializeErrors() {
    // returning a consistent error format for the entire application
    // converting the error type from express-validator's ValidationError
    // to our custom { errors: { message: string field?: string }[] }

    return this.errors?.map((item) => ({
      message: item.msg,
      field: item.param,
    }));
  }
}
