import mongoose, { Model } from 'mongoose';
import { ReviewDocument, UserDocument } from '../types';

const reviewSchema = new mongoose.Schema<ReviewDocument>(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Review must belong to a blog.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(
  /^find/,
  function (
    this: mongoose.Query<UserDocument[] | UserDocument | null, UserDocument>,
    next,
  ) {
    this.populate({
      path: 'user',
      select: 'name role image',
    });
    next();
  },
);

const Review: Model<ReviewDocument> = mongoose.model<ReviewDocument>(
  'Review',
  reviewSchema,
);

export default Review;
