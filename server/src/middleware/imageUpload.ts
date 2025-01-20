import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class UploadError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Verify Cloudinary configuration
const verifyCloudinaryConfig = () => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new UploadError('Cloudinary configuration is missing', 500);
  }
};

// Memory storage for multer
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new UploadError('Not an image! Please upload only images.', 400));
    return;
  }
  cb(null, true);
};

// Define separate multer configurations with different size limits
const profileImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

const blogImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: fileFilter,
});

// Function to upload buffer to Cloudinary
const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string,
): Promise<string> => {
  try {
    verifyCloudinaryConfig();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error Details:', {
              error: error.message,
              errorObject: error,
              folder,
              bufferSize: buffer.length,
            });

            reject(
              new UploadError(
                `Cloudinary upload failed: ${error.message}`,
                500,
              ),
            );
          } else if (!result?.secure_url) {
            console.error('Cloudinary Missing URL Error:', {
              result,
              folder,
              bufferSize: buffer.length,
            });

            reject(
              new UploadError(
                'Cloudinary upload failed - no secure URL received',
                500,
              ),
            );
          } else {
            resolve(result.secure_url);
          }
        },
      );

      const readableStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });

      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', {
      error,
      folder,
      bufferSize: buffer.length,
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof Error) {
      throw new UploadError(`Cloudinary upload failed: ${error.message}`, 500);
    }
    throw new UploadError('Cloudinary upload failed', 500);
  }
};

// Middleware for handling profile image uploads
const handleProfileImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      return next();
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'user-profiles');
    req.body.image = imageUrl;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware for handling blog image uploads
const handleBlogImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      console.log('No file provided for blog image upload');
      return next();
    }

    console.log('Blog Image Upload Details:', {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'blog-images');
    req.body.image = imageUrl;
    next();
  } catch (error) {
    console.error('Blog Image Upload Error:', {
      error,
      file: req.file
        ? {
            size: req.file.size,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname,
          }
        : 'No file',
    });
    next(error);
  }
};

// Error handling middleware
const uploadErrorHandler = (
  err: Error | UploadError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  console.error('Upload Error Handler:', {
    error: err,
    stack: err.stack,
    file: req.file
      ? {
          size: req.file.size,
          mimetype: req.file.mimetype,
          originalname: req.file.originalname,
        }
      : 'No file',
    multerError: err instanceof multer.MulterError,
  });

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      const limit = err.field === 'profileImage' ? '5MB' : '10MB';
      res.status(400).json({
        status: 'error',
        message: `File size exceeds limit of ${limit}`,
        details: {
          code: err.code,
          field: err.field,
          fileSize: req.file?.size,
        },
      });
      return;
    }
  }

  const statusCode = (err as UploadError).statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'An unexpected error occurred during upload',
    details:
      process.env.NODE_ENV === 'development'
        ? {
            error: err,
            stack: err.stack,
          }
        : undefined,
  });
};

// Create upload middlewares for profile and blog images
const createProfileUploadMiddleware = (fieldName: string) => {
  return profileImageUpload.single(fieldName);
};

const createBlogUploadMiddleware = (fieldName: string) => {
  return blogImageUpload.single(fieldName);
};

export {
  createProfileUploadMiddleware,
  createBlogUploadMiddleware,
  handleProfileImageUpload,
  handleBlogImageUpload,
  uploadErrorHandler,
};
