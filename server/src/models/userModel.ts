import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';
import crypto from 'crypto';
import { UserDocument } from '../types';

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: [true, 'Role is required and must be either "admin" or "user"'],
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el: string) {
          return el === (this.password as string);
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if the password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with Argon2
  if (this.password) {
    this.password = await argon2.hash(this.password);
  }
  this.passwordConfirm = undefined;
  next();
});

// Update passwordChangedAt if the password has changed
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();
  const userId = query._id;

  if (!userId) {
    return next(new Error('User ID not found in query'));
  }

  // Delete all blogs created by the user
  await mongoose.model('Blog').deleteMany({ user: userId });

  // Delete all comments made by the user
  await mongoose.model('Comment').deleteMany({ user: userId });

  // Delete all likes by the user
  await mongoose.model('LikedBlog').deleteMany({ user: userId });

  // Delete all saved blogs by the user
  await mongoose.model('SavedBlog').deleteMany({ user: userId });

  next();
});

// Method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
) {
  return await argon2.verify(this.password, candidatePassword);
};

// Check if the password was changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );

    // Return true if password was changed after token issued
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create a reset token for password reset
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Token expires in 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema,
);

export default User;
