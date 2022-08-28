import User from '../models/User';
import express, { Request, Response } from 'express';

const userRouter = express.Router();

userRouter.get('/users', (req: Request, res: Response) => {
  res.status(200).send('Express Server, Hello World!');
});

userRouter.post('/users', async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default userRouter;
