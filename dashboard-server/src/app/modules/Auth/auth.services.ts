import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }
  const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(401, 'Invalid credentials');
  }
  const jwtPayload = {
    email: user.email,
    id: user._id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '1d' });
  const refreshtoken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: '365d' });

  return { accessToken,refreshtoken };
};

const refreshToken = async (token: string) => {
  
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  //console.log(decoded);
  const { email } = decoded;
  const user = await User.findOne({ email:email });
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }
  const jwtPayload = {
    email: user.email,
    id: user._id,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '1d' });
  
  return {
    accessToken,
  };
};

const changePassword = async (userData: JwtPayload,payload: { email:string,oldPassword: string; newPassword: string },) => {
  
  const user = await User.findOne({ email: payload?.email });
  console.log(user);
  //console.log(payload);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  //console.log(payload.oldPassword,user?.password);

  if (!(await bcrypt.compare(payload.oldPassword, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const updatedUser = await User.findOneAndUpdate(
    { email: payload.email }, // Find by email
    { password: newHashedPassword },
    { new: true } // Return updated document
  );

  //console.log(updatedUser);

  if (!updatedUser) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Password update failed!');
  }
  return null;
};


export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};
