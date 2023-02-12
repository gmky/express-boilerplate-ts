import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, HttpStatusCode.UNAUTHORIZED_ERROR, message);
  }
}