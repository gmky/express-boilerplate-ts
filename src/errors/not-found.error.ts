import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, HttpStatusCode.NOT_FOUND_ERROR, message);
  }
}