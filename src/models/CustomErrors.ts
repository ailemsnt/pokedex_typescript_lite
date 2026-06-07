import { msgError, msgWarning } from "../utils/textFormatters";

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

export class ApiWarning extends Error {
  constructor(message: string) {
    super(msgWarning(message));
    this.name = "ApiWarning";
  }
}

export class LocalBoxWarning extends Error {
  constructor(message: string) {
    super(msgWarning(message));
    this.name = "LocalBoxWarning";
  }
}

export class ValidationWarning extends Error {
  constructor(message: string) {
    super(msgWarning(message));
    this.name = "ValidationWarning";
  }
}