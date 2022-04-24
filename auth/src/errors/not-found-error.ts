import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  STATUS_CODE: number = 404;

  constructor() {
    super('Route not found.');

    // when extending a class that is built-in class (Error)
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ status: this.STATUS_CODE, message: 'Not found.' }];
  }
}
