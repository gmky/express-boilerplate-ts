import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ValidationError } from "../errors";

export const validateBody = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError('Provided data is invalid', error?.errors);
    }
    throw new ValidationError('Provided data is invalid', {});
  }
}
