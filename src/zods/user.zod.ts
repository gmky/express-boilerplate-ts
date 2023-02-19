import { z } from "zod";
import { UserStatus } from "../constants";

export const UserZodSchema = z.object({
  username: z.string().max(24),
  email: z.string().email().max(55),
  password: z.string().min(8).max(255),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  status: z.nativeEnum(UserStatus).default(UserStatus.PENDING)
})