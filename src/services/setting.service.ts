import { UpdateSettingDTO } from "../dto";
import { ForbiddenError, NotFoundError } from "../errors";
import { Setting } from "../models"

export const settingService = {
  list: async () => {
    return await Setting.find({}).lean().exec();
  },

  findByKey: async (key: string) => {
    return await Setting.findOne({ key }).lean().exec();
  },

  updateByKey: async (data: UpdateSettingDTO) => {
    const existed = await Setting.findOne({ key: data.key }).exec();
    if (!existed) throw new NotFoundError(`Setting with key ${data.key} not found`);
    if (!existed.editable) throw new ForbiddenError(`Setting ${data.key} is uneditable`);
    existed.value = data.value;
    return await existed.save();
  }
}