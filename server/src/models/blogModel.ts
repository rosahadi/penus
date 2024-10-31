import mongoose, { Model } from 'mongoose';
import { BlogDocument } from '../types';

const BlogSchema = new mongoose.Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: String,
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['publish', 'hide'],
      default: 'hide',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Blog: Model<BlogDocument> = mongoose.model<BlogDocument>(
  'Blog',
  BlogSchema,
);

export default Blog;
