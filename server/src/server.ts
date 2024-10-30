import { PORT } from './config';
import { connectToDatabase } from './db/dbconn';
import app from './index';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 shutting down');
  process.exit(1);
});

connectToDatabase();

const port = PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', (err: unknown) => {
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log('Unhandled rejection received non-error type:', err);
  }
  console.log('Unhandled rejection! 💥 shutting down');
  server.close(() => process.exit(1));
});
