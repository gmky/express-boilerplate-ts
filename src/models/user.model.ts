import { model, Model, Schema } from "mongoose";
import { UserStatus } from "../constants";
import { genSaltSync, hashSync } from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  roleId: Schema.Types.ObjectId;
}

interface IUserMethods {
  hashPassword(): void;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: true,
    get: (): undefined => undefined
  },
  salt: { type: String, get: (): undefined => undefined },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, enum: UserStatus, default: UserStatus.PENDING, index: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role' }
}, {
  collection: 'users',
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: {
    getters: true
  }
})

userSchema.method('hashPassword', function hashPassword() {
  if (this.isModified('password')) {
    this.salt = genSaltSync(Number(process.env.SALT_ROUNDS));
    this.password = hashSync(this.get('password', null, { getters: false }), this.get('salt', null, { getters: false }));
  }
})

userSchema.pre('save', function (next) {
  this.hashPassword();
  next();
})

export const User = model<IUser, UserModel>('User', userSchema);