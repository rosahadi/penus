import express from 'express';

import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
userRouter.use(authController.protect);

userRouter.get('/logout', authController.logout);

userRouter.patch('/updateMyPassword', authController.updatePassword);
userRouter.patch('/updateMe', userController.updateMe);
userRouter.delete('/deleteMe', userController.deleteMe);

userRouter.route('/').get(userController.getAllUsers);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
