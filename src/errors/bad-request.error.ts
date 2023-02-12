import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, HttpStatusCode.BAD_REQUEST_ERROR, message);
  }
}