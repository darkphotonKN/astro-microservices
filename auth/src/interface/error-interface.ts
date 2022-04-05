// streamline all custom error types to follow the same structure
// temporarily unused - using abstract class instead
export interface CustomError {
  STATUS_CODE: number;
  serializeError(): { message: string; field?: string }[];
}
