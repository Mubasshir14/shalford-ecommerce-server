// /* eslint-disable @typescript-eslint/no-this-alias */
// import mongoose, { Schema } from 'mongoose';
// import { IUser, UserModel, UserRole } from './user.interface';
// import bcrypt from 'bcrypt';
// import { StatusCodes } from 'http-status-codes';
// import config from '../../app/config';
// import AppError from '../../app/errors/AppError';

// const userSchema = new Schema<IUser, UserModel>(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: [UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN],
//       default: UserRole.USER,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     clientInfo: {
//       device: {
//         type: String,
//         enum: ['pc', 'mobile'],
//         required: true,
//       },
//       browser: {
//         type: String,
//         required: true,
//       },
//       ipAddress: {
//         type: String,
//         required: true,
//       },
//       pcName: {
//         type: String,
//       },
//       os: {
//         type: String,
//       },
//       userAgent: {
//         type: String,
//       },
//     },
//     lastLogin: {
//       type: Date,
//       default: Date.now,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     otpToken: {
//       type: String,
//       default: null,
//     },
//     resetPasswordToken: {
//       type: String,
//       default: null,
//     },
//     resetPasswordExpires: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// userSchema.pre('save', async function (next) {
//   const user = this;

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// userSchema.set('toJSON', {
//   transform: (_doc, ret: Partial<IUser>) => {
//     delete ret.password;
//     return ret;
//   },
// });

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

// userSchema.statics.isUserExistsByEmail = async function (email: string) {
//   return await User.findOne({ email }).select('+password');
// };

// userSchema.statics.checkUserExist = async function (userId: string) {
//   const existingUser = await this.findById(userId);

//   if (!existingUser) {
//     throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
//   }

//   if (!existingUser.isActive) {
//     throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is not active!');
//   }

//   return existingUser;
// };

// const User = mongoose.model<IUser, UserModel>('User', userSchema);
// export default User;

/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN],
      default: UserRole.USER,
    },
    address: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    clientInfo: {
      device: { type: String, enum: ['pc', 'mobile'], required: true },
      browser: { type: String, required: true },
      ipAddress: { type: String, required: true },
      pcName: String,
      os: String,
      userAgent: String,
    },
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    otpToken: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

// Only hash password if modified
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret: Partial<IUser>) => {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);
  if (!existingUser)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
  if (!existingUser.isActive)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is not active!');
  return existingUser;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;
