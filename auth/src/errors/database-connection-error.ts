export class DataBaseConnectionError extends Error {
  private reason = 'There was a database Connection error.';
  constructor() {
    super();
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }
}
