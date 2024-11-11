import express from 'express';

import * as commentController from '../controllers/commentController';
import * as authController from '../controllers/authController';
import setBlogUserIds from '../middleware/setBlogUserIds';

const commentRouter = express.Router();

commentRouter.route('/:id?').get(commentController.getAllComments);

commentRouter.use(authController.protect);

commentRouter
  .route('/')
  .post(
    authController.restrictTo('user', 'admin'),
    setBlogUserIds,
    commentController.createComment,
  );

commentRouter
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.restrictTo('user', 'admin'),
    commentController.updateComment,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    commentController.deleteComment,
  );

export default commentRouter;
