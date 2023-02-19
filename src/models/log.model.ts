import { model, Schema } from "mongoose";

export interface ILog {
  status: number;
  rMethod: string;
  path: string;
  query: string;
  body: string;
  actor: string;
  clientId: string;
  ip: string;
  createdAt: Date,
  updatedAt: Date
}

const logSchema = new Schema<ILog>({
  status: { type: Number, required: true },
  rMethod: { type: String, required: true, uppercase: true },
  path: { type: String, required: true, lowercase: true },
  query: { type: Schema.Types.Mixed },
  body: { type: Schema.Types.Mixed },
  actor: { type: String, required: true },
  clientId: { type: String },
  ip: { type: String, required: true }
}, {
  collection: 'logs',
  timestamps: true,
  versionKey: false,
  virtuals: true
})

logSchema.index({ createdAt: 1 }, { expires: '7d' })

export const Log = model<ILog>('Log', logSchema);