import { z } from "zod";
import { SettingZodSchema } from "../zods";

export const UpdateSettingSchema = SettingZodSchema.pick({ key: true, value: true });

export type UpdateSettingDTO = z.infer<typeof UpdateSettingSchema>;