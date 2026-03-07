export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true; // Marks it as a "known" error we created

    // Fix for TypeScript extending built-in classes
    Object.setPrototypeOf(this, AppError.prototype);

    // Captures the stack trace (where the error happened)
    Error.captureStackTrace(this, this.constructor);
  }
}
