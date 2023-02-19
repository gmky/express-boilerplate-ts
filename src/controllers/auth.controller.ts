import { Request, Response } from "express";
import { userService } from "../services";
import { LoginDTO } from "../dto";

export const authController = {
  login: async (req: Request<{}, {}, LoginDTO>, res: Response) => {
    const { body: data } = req;
    const result = await userService.login(data, req.socket.remoteAddress as string);
    return res.status(200).json(result);
  },

  profile: async (req: Request, res: Response) => {
    const user = req.user;
    const result = await userService.findById(user?._id);
    return res.json(result);
  },

  refreshToken: async (req: Request<{}, {}, {}, { token: string }>, res: Response) => {
    const { token } = req.query;
    const result = await userService.refreshToken(token);
    return res.json({ ...result, refreshToken: token });
  },

  revokeToken: async (req: Request<{}, {}, {}, { token: string }>, res: Response) => {
    const { token } = req.query;
    const { user } = req;
    const result = await userService.revokeToken(user?._id, token);
    return res.json({ message: 'OK'});
  }
}