import { z } from "zod";
import { UserZodSchema } from "../zods";

export const CreateUserSchema = UserZodSchema.omit({ status: true });

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;