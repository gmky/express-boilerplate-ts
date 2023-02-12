import { NextFunction, Request, Response } from "express";
import { getLogger } from "../configs";

const logger = getLogger('RequestLogger')

export const loggingHandler = (req: Request, res: Response, next: NextFunction) => {
  logger.debug(`[${'BEGIN'.padEnd(5, ' ')}] - ${req.method.padEnd(6, ' ')} ${req.originalUrl}`);

  res.on('finish', () => {
    logger.debug(`[${'END'.padEnd(5, ' ')}] - ${req.method.padEnd(6, ' ')} ${req.originalUrl}`);
  })

  return next();
}