import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routers from './routers';
import { requestLogger, errorLogger } from './middlewares/logger';

interface IError extends Error {
    statusCode?: number;
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routers);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Запрашиваемый ресурс не найден') as IError;
  error.statusCode = 404;
  next(error);
});

app.use(errorLogger);

app.use(errors());

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message });
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('✅ MongoDB connected');

    app.listen(+PORT, () => {
      console.log(`🚀 App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Ошибка при запуске сервера:', err);
    process.exit(1);
  }
};

startServer();
