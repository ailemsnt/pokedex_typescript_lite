import { msgError } from "../utils/textFormatters";

export class ApiError extends Error {
  constructor(message: string) {
    super(msgError(message));
    this.name = "ApiError";
  }
}

export class LocalBoxError extends Error {
  constructor(message: string) {
    super(msgError(message));
    this.name = "LocalBoxError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(msgError(message));
    this.name = "ValidationError";
  }
}