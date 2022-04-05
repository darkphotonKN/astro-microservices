// import { CustomError } from '../interface/error-interface';

import { CustomError } from './custom-error';

// temp removed interface in favor of abstract classes to be able to use "instanceof"
// export class DataBaseConnectionError extends Error implements CustomError {
export class DataBaseConnectionError extends CustomError {
  private reason = 'There was a database Connection error.';
  STATUS_CODE = 500;

  constructor() {
    super('Database error occured.');
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }

  // method for extracting this error type's specific error+status
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
