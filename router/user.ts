import User from '../models/User';
import express, { Request, Response } from 'express';

const userRouter = express.Router();

// Get all users
userRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new user

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
    store: req.body.store,
    role: req.body.role,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a user by id
userRouter.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a user

userRouter.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user
userRouter.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default userRouter;
