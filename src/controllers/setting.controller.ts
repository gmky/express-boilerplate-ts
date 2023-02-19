import { Request, Response } from "express";
import { UpdateSettingDTO } from "../dto";
import { settingService } from "../services";

export const settingController = {
  list: async (_req: Request, res: Response) => {
    const result = await settingService.list();
    return res.json(result);
  },

  findByKey: async (req: Request, res: Response) => {
    const { key } = req.query;
    const result = await settingService.findByKey(key as string);
    return res.json(result);
  },

  updateByKey: async (req: Request<{}, {}, UpdateSettingDTO>, res: Response) => {
    const { body: data } = req;
    const result = await settingService.updateByKey(data);
    return res.json(result);
  }
}