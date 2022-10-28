import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user';
import morgan from 'morgan';
import cors from 'cors';
import equipmentRouter from './router/equipment';
import expendableRouter from './router/expendable';
import withdrawalRouter from './router/withdrawal';
import projectRouter from './router/project';
import storeRouter from './router/storage';
import reservationRouter from './router/reservation';

dotenv.config();

const app: Application = express();
const host: string = process.env.HOST || 'localhost';
const port: number = 3000;
const MONGO_URI: string =
  process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const allowedOrigins = '*';
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(options));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', withdrawalRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', storeRouter);
app.use('/api/v1', equipmentRouter);
app.use('/api/v1', expendableRouter);
app.use('/api/v1', reservationRouter);

// Start the server
app.listen(port, host, () => {
  console.log('Server started on port ' + port);
});
