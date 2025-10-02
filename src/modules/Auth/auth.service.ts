/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { IAuth, IJwtPayload } from './auth.interface';
import User from '../User/user.model';
import bcrypt from 'bcrypt';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../../app/config';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload, Secret } from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (!user.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name as string,
      email: user.email as string,
      phone: user.phone as string,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { clientInfo: payload.clientInfo, lastLogin: Date.now() },
      { new: true, session },
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  if (!isUserExist.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }

  const jwtPayload: IJwtPayload = {
    userId: isUserExist._id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    phone: isUserExist.phone as string,
    isActive: isUserExist.isActive,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { userId } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!user.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User account is inactive');
  }

  const isOldPasswordCorrect = await User.isPasswordMatched(
    oldPassword,
    user.password,
  );
  if (!isOldPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.updateOne({ _id: userId }, { password: hashedPassword });

  return { message: 'Password changed successfully' };
};

const forgetPassword = async (payload: { email: string; phone: string }) => {
  const { email, phone } = payload;

  const user = await User.findOne({ email, phone });
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'User not found with this email/phone',
    );
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = (Date.now() + 15 * 60 * 1000) as any;
  await user.save({ validateBeforeSave: false });

  const resetURL = `${config.client_url}/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.from_email,
      pass: config.from_pass,
    },
  });

  await transporter.sendMail({
    from: `"Shalford & Co." <${config.from_email}>`,
    to: user.email,
    subject: 'Password Reset Request',
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color: #b45309;">Password Reset Request 🔒</h2>
    <p>Hello,</p>
    <p>You requested a password reset for your account. Click the button below to reset your password within <b style="color: #f59e0b">15 minutes<b/></p>
    
    <div style="margin: 20px 0; text-align: center;">
      <a href="${resetURL}" 
         style="
           background-color: #f59e0b; 
           color: white; 
           text-decoration: none; 
           padding: 12px 24px; 
           border-radius: 6px; 
           font-weight: bold; 
           display: inline-block;
           font-size: 16px;
         ">
         Reset Password
      </a>
    </div>

    <p>If you did not request this, please ignore this email.</p>
    <p>Thanks,<br/>Shalford & Co.</p>
  </div>
 `,
  });

  return { message: 'Password reset link sent to your email' };
};

const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Invalid or Expired Reset Link',
    );
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: 'Password reset successful' };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
