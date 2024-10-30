import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
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

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
