import express from 'express';

import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';
import {
  createProfileUploadMiddleware,
  handleProfileImageUpload,
  uploadErrorHandler,
} from '../middleware/imageUpload';

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.get('/checkAuthAndGetUser', authController.checkAuthAndGetUser);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.get('/search', userController.searchUsers);

// Protect all routes after this middleware
userRouter.use(authController.protect);

userRouter.get('/logout', authController.logout);

userRouter.patch('/updateMyPassword', authController.updatePassword);
userRouter.patch(
  '/updateMe',
  createProfileUploadMiddleware('image'),
  handleProfileImageUpload,
  uploadErrorHandler,
  userController.updateMe,
);
userRouter.delete('/deleteMe', userController.deleteMe);

userRouter.route('/').get(userController.getAllUsers);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
