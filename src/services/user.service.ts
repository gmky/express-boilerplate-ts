import { compareSync } from "bcrypt";
import { getLogger } from "../configs";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { EmailExistedError, ForbiddenError, UnauthorizedError, UsernameExistedError, UserNotFoundError } from "../errors";
import { Token, User } from "../models";
import { getPrivateKey } from "../utils/cert.util";
import { LoginDTO, CreateUserDTO } from "../dto";
import md5 from "md5";
import { UserStatus } from "../constants";

const log = getLogger('UserService');

export const userService = {
  save: async (data: CreateUserDTO) => {
    let existedUser = await User.exists({ username: data.username }).exec();
    if (existedUser) throw new UsernameExistedError(data.username);
    existedUser = await User.exists({ email: data.email }).exec();
    if (existedUser) throw new EmailExistedError(data.email);
    const user = new User(data);
    return await user.save();
  },

  login: async (data: LoginDTO, sourceIP: string) => {
    const existedUser = await User.findOne({ username: data.username });
    if (!existedUser) throw new UserNotFoundError(data.username);
    const isPasswordMatched = compareSync(data.password, existedUser.get('password', null, { getters: false }));
    if (!isPasswordMatched) throw new UnauthorizedError('Username or password mismatch');
    if (UserStatus.ACTIVE != existedUser.status) throw new UnauthorizedError('User status invalid');
    const privateKey = getPrivateKey();
    const accessToken = sign(existedUser.toJSON(), privateKey, { algorithm: 'RS256', expiresIn: '10h' });
    const { username, email, _id } = existedUser;
    const refreshToken = sign({ _id, email, username }, privateKey, { algorithm: 'RS256', expiresIn: '30d' });
    const token = new Token({
      userId: _id,
      token: refreshToken,
      createdByIP: sourceIP
    })
    await token.save();
    return { accessToken, refreshToken };
  },

  findById: async (id: string) => {
    return await User.findById(id).exec();
  },

  refreshToken: async (token: string) => {
    if (!token) throw new ForbiddenError();
    try {
      const payload = verify(token, getPrivateKey()) as JwtPayload;
      if (!payload) throw new ForbiddenError();
      const existed = await Token.findOne({ token: md5(token), revoked: false }).exec();
      if (!existed || existed.isExpired()) throw new ForbiddenError();
      if (payload?._id !== existed.userId.toString()) throw new ForbiddenError();
      const user = await User.findById(existed.userId).exec();
      if (!user) throw new ForbiddenError();
      const privateKey = getPrivateKey();
      const accessToken = sign(user.toJSON(), privateKey, { algorithm: 'RS256', expiresIn: '10h' });
      return { accessToken };
    } catch (error) {
      throw new ForbiddenError();
    }
  },

  revokeToken: async (userId: string, token: string) => {
    if (!token) throw new ForbiddenError();
    return await Token.findOneAndUpdate(
      { token: md5(token), userId: userId },
      { $set: { revoked: true }, $currentDate: { revokedAt: true }}
    ).exec();
  }
}