import { z } from "zod";
import { UserZodSchema } from "../zods";

export const LoginSchema = UserZodSchema.pick({ username: true, password: true});

export type LoginDTO = z.infer<typeof LoginSchema>;