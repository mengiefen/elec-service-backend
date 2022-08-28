import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const host: string = process.env.HOST || 'localhost';
const port: number = 3000;
const MONGO_URI: string =
  process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const allowedRegions = '*';
const options: cors.CorsOptions = {
  origin: allowedRegions,
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

// Start the server
app.listen(port, host, () => {
  console.log('Server started on port ' + port);
});
