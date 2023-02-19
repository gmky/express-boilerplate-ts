import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ForbiddenError } from "../errors";
import { Role } from "../models";
import { getPrivateKey } from "../utils/cert.util";

export const isLogged = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.substring(7);
  if (!token) throw new ForbiddenError();
  try {
    const payload = verify(token, getPrivateKey());
    if (!payload) throw new ForbiddenError();
    req.user = payload;
  } catch (error) {
    throw new ForbiddenError();
  }
  return next();
}

export const requireOne = (arg: string) => async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;
  const role = await Role.findById(user?.roleId).exec();
  if (!role) throw new ForbiddenError();
  const isGranted = role?.permissions.includes(arg);
  if (!isGranted) throw new ForbiddenError();
  return next();
}

export const requireAllOf = (...args: string[]) => async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;
  const role = await Role.findById(user?.roleId).exec();
  if (!role) throw new ForbiddenError();
  const isGranted = args.every(item => role.permissions.includes(item));
  if (!isGranted) throw new ForbiddenError();
  return next();
}

export const requireAnyOf = (...args: string[]) => async (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;
  const role = await Role.findById(user?.roleId).exec();
  if (!role) throw new ForbiddenError();
  const isGranted = args.some(item => role.permissions.includes(item));
  if (!isGranted) throw new ForbiddenError();
  return next();
}