import Withdrawal from '../models/Withdrawal';
import Project from '../models/Project';
import express, { Request, Response } from 'express';

const withdrawalRouter = express.Router();

// Get all withdrawals
withdrawalRouter.get('/withdrawals', async (req: Request, res: Response) => {
  try {
    const withdrawals = await Withdrawal.find();
    res.json(withdrawals);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all withdrawals by project
withdrawalRouter.get(
  '/project/:project_id/withdrawals',
  async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.project_id);
    if (!project) {
      res.status(404).send('Project not found');
    } else {
      try {
        const withdrawals = await Withdrawal.find({
          project: req.params.project_id,
        });
        res.json(withdrawals);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  },
);

// Create a new withdrawal
withdrawalRouter.post('/withdrawals', async (req: Request, res: Response) => {
  const withdrawal = new Withdrawal({
    date: req.body.date,
    store: req.body.store,
    project: req.body.project,
    user: req.body.user,
    items: req.body.items,
  });

  try {
    const savedWithdrawal = await withdrawal.save();
    res.status(201).send(savedWithdrawal);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a withdrawal by id
withdrawalRouter.get(
  '/withdrawals/:id',
  async (req: Request, res: Response) => {
    try {
      const withdrawal = await Withdrawal.findById(req.params.id);
      res.status(200).send(withdrawal);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Update a withdrawal
withdrawalRouter.put(
  '/withdrawals/:id',
  async (req: Request, res: Response) => {
    try {
      const withdrawal = await Withdrawal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );
      res.status(200).send(withdrawal);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Delete a withdrawal
withdrawalRouter.delete(
  '/withdrawals/:id',
  async (req: Request, res: Response) => {
    try {
      const withdrawal = await Withdrawal.findByIdAndDelete(req.params.id);
      res.status(200).send(withdrawal);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

export default withdrawalRouter;
