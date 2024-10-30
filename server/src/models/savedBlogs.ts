import mongoose from 'mongoose';

const savedBlogSchema = new mongoose.Schema(
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

const savedBlog = mongoose.model('savedBlog', savedBlogSchema);

export default savedBlog;
