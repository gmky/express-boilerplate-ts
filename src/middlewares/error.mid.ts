import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";
import { getLogger } from "../configs";
import { HttpStatusCode } from "../constants";

const logger = getLogger('ErrorHandler')

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  if (res.headersSent) return next(error);
  if (error instanceof HttpError) {
    return res.status(error.status).json(error);
  }
  return res.status(500).json({
    status: 500,
    code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  })
}