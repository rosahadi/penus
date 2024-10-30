import mongoose from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';
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
      default: '/images/default.jpg',
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

// Method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
) {
  return await argon2.verify(this.password, candidatePassword);
};

const User = mongoose.model('User', userSchema);

export default User;
