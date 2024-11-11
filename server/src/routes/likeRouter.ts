import express from 'express';

import * as likeController from '../controllers/likeController';
import * as authController from '../controllers/authController';
import setBlogUserIds from '../middleware/setBlogUserIds';

const LikeRouter = express.Router();

LikeRouter.route('/:id?').get(likeController.getAllLikes);

LikeRouter.use(authController.protect);

LikeRouter.route('/').post(
  authController.restrictTo('user', 'admin'),
  setBlogUserIds,
  likeController.createLike,
);

LikeRouter.route('/:id').delete(
  authController.restrictTo('user', 'admin'),
  likeController.deleteLike,
);

export default LikeRouter;
