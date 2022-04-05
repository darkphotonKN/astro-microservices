export abstract class CustomError extends Error {
  // abstract keyword makes sure subclasses must implement
  abstract STATUS_CODE: number;

  constructor(message: string) {
    // This super is calling the prebuilt class Error where normally
    // we call new Error("asdas") where the string logs as an error.
    // Here we call super when extending a class and pass down the custom message
    // to throw to the original Error implementation for logging purposes.
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
