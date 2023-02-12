import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, HttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}