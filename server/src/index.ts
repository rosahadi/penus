import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import userRouter from './routes/userRouter';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Test route
app.use('/api/users', userRouter);

export default app;
