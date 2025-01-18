import express from 'express';

import * as saveBlogController from '../controllers/saveBlogController';
import * as authController from '../controllers/authController';

const saveRouter = express.Router();

saveRouter.use(authController.protect);

saveRouter
  .route('/')
  .patch(saveBlogController.saveBlog)
  .get(saveBlogController.getSavedBlogs);

saveRouter.route('/:id').delete(saveBlogController.deleteSavedBlog);

export default saveRouter;
