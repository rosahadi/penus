import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Test route
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route working' });
});

export default app;
