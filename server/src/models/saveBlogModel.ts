import mongoose from 'mongoose';
import { SaveBlogDocument } from '../types';

const savedBlogSchema = new mongoose.Schema<SaveBlogDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

savedBlogSchema.index({ user: 1, blog: 1 }, { unique: true });

const SavedBlog = mongoose.model('SavedBlog', savedBlogSchema);

export default SavedBlog;
