import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const app = express();

// Set up DOMPurify with JSDOM for server-side
const { window } = new JSDOM('');
const purify = DOMPurify(window);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Middleware to sanitize user input
app.use((req: Request, res: Response, next: NextFunction) => {
  // Sanitize request body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = purify.sanitize(req.body[key]);
      }
    }
  }

  next();
});

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['page', 'limit'],
  }),
);

// Test route
app.use('/api/users', userRouter);

export default app;
