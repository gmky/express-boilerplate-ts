import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class ValidationError extends HttpError {
  details: any;
  constructor(message: string, details: any) {
    super(400, HttpStatusCode.BAD_REQUEST_ERROR, message);
    this.details = details;
  }
}