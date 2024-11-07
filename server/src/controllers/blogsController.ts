import { Request } from 'express';
import Blog from '../models/blogModel';
import APIFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import * as factory from './handlerFactory';
import { UserDocument } from '../types';

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
    const features = new APIFeatures(baseQuery, req.query).paginate();

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
  const features = new APIFeatures(baseQuery, req.query).paginate();

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
  const blog = await Blog.findById(req.params.id)
    .populate({ path: 'comments' })
    .lean({ virtuals: true });

  // Restrict access to hidden blogs
  if (!blog || blog.status === 'hide') {
    return next(new AppError('No blog found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
});
