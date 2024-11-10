import express from 'express';

import * as blogsController from '../controllers/blogsController';
import * as authController from '../controllers/authController';
import {
  createBlogUploadMiddleware,
  handleBlogImageUpload,
  uploadErrorHandler,
} from '../middleware/imageUpload';

const blogRouter = express.Router();

blogRouter.get('/public', blogsController.getPublicBlogs);
blogRouter.get('/public/:id', blogsController.getPublicBlogById);

// Protect all routes after this middleware
blogRouter.use(authController.protect);

blogRouter.get('/myBlogs', blogsController.getMyBlogs);

blogRouter
  .route('/')
  .get(authController.restrictTo('admin'), blogsController.getAllBlogs)
  .post(
    createBlogUploadMiddleware('image'),
    handleBlogImageUpload,
    uploadErrorHandler,
    blogsController.createBlog,
  );

blogRouter
  .route('/:id')
  .get(blogsController.getBlogById)
  .patch(
    createBlogUploadMiddleware('image'),
    handleBlogImageUpload,
    uploadErrorHandler,
    blogsController.updateBlog,
  )
  .delete(blogsController.deleteBlog);

export default blogRouter;
