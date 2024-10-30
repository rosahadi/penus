import mongoose from 'mongoose';

const likedBlogSchema = new mongoose.Schema(
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

const LikedBlog = mongoose.model('LikedBlog', likedBlogSchema);

export default LikedBlog;
