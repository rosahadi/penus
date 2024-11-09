import mongoose, { Model } from 'mongoose';
import { CommentDocument, UserDocument } from '../types';

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Comment must belong to a blog.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

commentSchema.pre(
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

const Comment: Model<CommentDocument> = mongoose.model<CommentDocument>(
  'Comment',
  commentSchema,
);

export default Comment;
