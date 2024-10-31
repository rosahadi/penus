import mongoose, { Types } from 'mongoose';

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  image: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;
  correctPassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
  changedPasswordAfter(JWTTimestamp: number): boolean;
}

export interface BlogDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  status: 'publish' | 'hide';
  slug?: string | null;
  image?: string | null;
  user?: Types.ObjectId | UserDocument;
  reviews?: ReviewDocument[];
}

export interface ReviewDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  review: string;
  rating: number;
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  token?: string;
  passwordCurrent?: string;
}
