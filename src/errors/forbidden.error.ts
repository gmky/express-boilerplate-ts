import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super(403, HttpStatusCode.FORBIDDEN_ERROR, message || 'Access denied');
  }
}