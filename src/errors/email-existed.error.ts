import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class EmailExistedError extends HttpError {
  constructor(email: string) {
    super(400, HttpStatusCode.USER_EXISTED, `User with email ${email} existed`);
  }
}