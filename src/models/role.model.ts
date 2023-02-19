import { model, Schema } from "mongoose";

export interface IRole {
  name: string;

  description: string;

  permissions: string[];
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  permissions: [{ type: String }],
}, {
  collection: 'roles',
  versionKey: false,
  timestamps: true,
  virtuals: true
})

export const Role = model<IRole>('Role', roleSchema);