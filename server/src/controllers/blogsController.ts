import { Request } from 'express';
import Blog from '../models/blogModel';
import APIFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';
import catchAsync from '../middleware/catchAsync';
import * as factory from './handlerFactory';
import { UserDocument } from '../types';
import currentUser from '../utils/currentUser';
import SavedBlog from '../models/saveBlogModel';

export const getAllBlogs = factory.getAll(Blog);
export const getBlogById = factory.getOne(Blog, { path: 'comments' });
export const updateBlog = factory.updateOne(Blog);
export const createBlog = factory.createOne(Blog);
export const deleteBlog = factory.deleteOne(Blog);

// Get All blogs of the current user (admin)
export const getMyBlogs = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    // Create the base query without pagination
    const baseQuery = Blog.find({ user: req.user._id });

    // Get the total count of blogs for pagination
    // Use clone() to avoid modifying the base query
    const totalBlogs = await baseQuery.clone().countDocuments();

    // Apply pagination to the query
    const features = new APIFeatures(baseQuery, req.query).paginate().sort();

    const blogs = await features.query;

    if (!blogs) {
      return next(new AppError('No blogs found for this user.', 404));
    }

    res.status(200).json({
      status: 'success',
      results: blogs.length,
      totalBlogs,
      data: {
        blogs,
      },
    });
  },
);

//Get all Public Blogs
export const getPublicBlogs = catchAsync(async (req, res, next) => {
  const baseQuery = Blog.find({ status: 'publish' });

  const totalBlogs = await baseQuery.clone().countDocuments();

  // Apply pagination to the query
  const features = new APIFeatures(baseQuery, req.query).paginate().sort();

  const publicBlogs = await features.query;

  if (publicBlogs.length === 0) {
    return next(new AppError('No public blog found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: publicBlogs.length,
    totalBlogs,
    data: {
      blogs: publicBlogs,
    },
  });
});

// Get Public blog
export const getPublicBlogById = catchAsync(async (req, res, next) => {
  // Makes user retrieval optional
  const user = await currentUser(req).catch(() => null);

  const blog = await Blog.findById(req.params.id)
    .populate('comments')
    .lean({ virtuals: true });

  if (!blog) {
    return next(new AppError('Blog not found', 404));
  }
  if (blog.status === 'hide') {
    return next(new AppError('This blog is not available', 403));
  }

  // Handle isSaved only if user exists
  const isSaved = user
    ? (await SavedBlog.exists({
        blog: blog._id,
        user: user._id,
      })) !== null
    : false;

  const sanitizedBlog = {
    ...blog,
    isSaved,
  };

  res.status(200).json({
    status: 'success',
    data: sanitizedBlog,
  });
});

// Search controller
export const searchBlogs = catchAsync(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(200).json({
      status: 'success',
      results: 0,
      data: {
        blogs: [],
      },
    });
  }

  const searchRegex = new RegExp(String(query), 'i');

  // Base query that ensures we only search public blogs
  const blogs = await Blog.find({
    status: 'publish',
    title: searchRegex,
  }).lean();

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs,
    },
  });
});
