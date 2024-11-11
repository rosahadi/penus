import mongoose, { Model } from 'mongoose';
import { BlogDocument, UserDocument } from '../types';
import slugify from 'slugify';

const BlogSchema = new mongoose.Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'A Blog name must more or equal than 3 characters'],
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

BlogSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blog',
  localField: '_id',
});

BlogSchema.virtual('likes', {
  ref: 'LikedBlog',
  foreignField: 'blog',
  localField: '_id',
});

BlogSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

BlogSchema.pre(
  /^find/,
  function (
    this: mongoose.Query<BlogDocument[] | BlogDocument | null, BlogDocument>,
    next,
  ) {
    this.populate<{ user: UserDocument }>({
      path: 'user',
      select: '-__v -passwordChangedAt',
    });
    next();
  },
);

const Blog: Model<BlogDocument> = mongoose.model<BlogDocument>(
  'Blog',
  BlogSchema,
);

export default Blog;
