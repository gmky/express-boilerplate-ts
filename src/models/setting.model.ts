import { model, Schema } from "mongoose";

export interface ISetting {
  key: string;

  value: string;

  editable: boolean;
}

const settingSchema = new Schema<ISetting>({
  key: { type: String, required: true, unique: true, uppercase: true },
  value: { type: Schema.Types.Mixed, required: true },
  editable: { type: Boolean, required: true, default: false }
}, {
  collection: 'settings',
  versionKey: false,
  virtuals: true,
  timestamps: true
})

export const Setting = model<ISetting>('Setting', settingSchema);