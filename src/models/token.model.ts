import md5 from "md5";
import { model, Model, Schema } from "mongoose";

export interface IToken {
  userId: Schema.Types.ObjectId;
  token: string;
  createdByIP: string;
  revoked: boolean,
  revokedAt: Date;
  revokedByIP: string;
  expires: Date;
}

interface ITokenMethods {
  isExpired(): boolean;
}

export type TokenModel = Model<IToken, {}, ITokenMethods>;

const tokenSchema = new Schema<IToken, TokenModel, ITokenMethods>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true, unique: true },
  createdByIP: { type: String, required: true },
  revoked: { type: Boolean, required: true, default: false, index: true },
  revokedAt: { type: Date },
  revokedByIP: { type: String },
  expires: { type: Date }
}, {
  collection: 'tokens',
  timestamps: true,
  virtuals: true,
  versionKey: false
})

tokenSchema.method('isExpired', function isExpired() {
  return Date.now() >= this.expires;
})

tokenSchema.pre('save', function (next) {
  const payloadBase64 = this.token.split('.')[1];
  const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
  const decoded = JSON.parse(decodedJson)
  const exp = decoded.exp;
  this.expires = new Date(exp * 1000);
  this.token = md5(this.token);
  next();
})

export const Token = model<IToken, TokenModel>('Token', tokenSchema);