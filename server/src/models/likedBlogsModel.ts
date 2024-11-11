import mongoose from 'mongoose';
import { LikeDocument, UserDocument } from '../types';

const likedBlogSchema = new mongoose.Schema<LikeDocument>(
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

likedBlogSchema.pre(
  /^find/,
  function (
    this: mongoose.Query<UserDocument[] | UserDocument | null, UserDocument>,
    next,
  ) {
    this.populate({
      path: 'user',
      select: 'name role image email',
    });
    next();
  },
);

const LikedBlog = mongoose.model<LikeDocument>('LikedBlog', likedBlogSchema);

export default LikedBlog;
