import { NotFoundError } from "./not-found.error";

export class UserNotFoundError extends NotFoundError {
  constructor(username: string) {
    super(`User with username ${username} not found`);
  }
}