import express from 'express';

import * as reviewController from '../controllers/reviewController';
import * as authController from '../controllers/authController';

const reviewRouter = express.Router();

reviewRouter.route('/:id?').get(reviewController.getAllReviews);

reviewRouter.use(authController.protect);

reviewRouter
  .route('/')
  .post(
    authController.restrictTo('user', 'admin'),
    reviewController.setBlogUserIds,
    reviewController.createReview,
  );

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );

export default reviewRouter;
