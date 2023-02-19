import { HttpStatusCode } from "../constants";
import { HttpError } from "./http.error";

export class UsernameExistedError extends HttpError {
  constructor(username: string) {
    super(400, HttpStatusCode.USER_EXISTED, `User with username ${username} existed`);
  }
}