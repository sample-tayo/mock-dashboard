import type { ErrorMessageTypes } from "@/enums";

export class ApiError extends Error {
  type: ErrorMessageTypes;

  constructor(message: string, type: ErrorMessageTypes) {
    super(message);
    this.type = type;
    this.name = "ApiError";
  }
}
