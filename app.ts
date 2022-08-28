import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const host: string = process.env.HOST || 'localhost';
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Express Server, Hello World!');
});

app.listen(port, host, () => {
  console.log('Server started on port ' + port);
});
