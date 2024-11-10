// import { NextFunction, Request } from 'express';
// import cloudinary from '../cloudinaryConfig';
// import multer from 'multer';
// import AppError from './appError';

// const storage = multer.memoryStorage();

// export const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       cb(new Error('Not an image! Please upload only images.'));
//       return;
//     }
//     cb(null, true);
//   },
// });

// export const uploadToCloudinary = async (
//   file: Express.Multer.File,
//   folder: 'blog-images' | 'user-profiles',
// ) => {
//   if (!file) throw new AppError('No file to upload', 400);

//   const imageData = file.buffer.toString('base64');
//   const fileUri = `data:${file.mimetype};base64,${imageData}`;

//   const result = await cloudinary.uploader.upload(fileUri, {
//     folder,
//     transformation: [
//       { width: folder === 'user-profiles' ? 400 : 1200 },
//       { quality: 'auto:good' },
//       { fetch_format: 'auto' },
//     ],
//   });

//   return result.secure_url;
// };

// // Modified error handling middleware
// export const handleUploadError = (
//   error: Error | multer.MulterError,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): void => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return next(
//         new AppError('File size too large. Maximum size is 5MB', 400),
//       );
//     }
//     return next(new AppError(error.message, 400));
//   }

//   if (error.message === 'Not an image! Please upload only images.') {
//     return next(new AppError(error.message, 400));
//   }

//   next(error);
// };
