import { z } from "zod";

export const SettingZodSchema = z.object({
  key: z.string().min(4),
  value: z.any()
})