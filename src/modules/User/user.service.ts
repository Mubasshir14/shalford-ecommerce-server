import mongoose from 'mongoose';
import { IUser, UserRole } from './user.interface';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import User from './user.model';
import { AuthService } from '../Auth/auth.service';

const registerUser = async (userData: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if ([UserRole.ADMIN || UserRole.SUPERADMIN].includes(userData.role)) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        'Invalid role. Only User is allowed.',
      );
    }

    const existingUser = await User.findOne({ email: userData.email }).session(
      session,
    );
    if (existingUser) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        'Email is already registered',
      );
    }
    const existingUserByPhone = await User.findOne({
      phone: userData.phone,
    }).session(session);
    if (existingUserByPhone) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Phone is already used');
    }

    const user = new User(userData);
    const createdUser = await user.save({ session });

    await session.commitTransaction();

    return await AuthService.loginUser({
      email: createdUser.email,
      password: userData.password,
      clientInfo: userData.clientInfo,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllUser = async () => {
  const result = await User.find().sort({ createdAt: -1 });
  return result;
};

export const UserServices = { registerUser, getAllUser };
