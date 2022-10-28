import Expendable from '../models/Expendable';

import express, { Request, Response } from 'express';

const expendableRouter = express.Router();

// Get all expendables
expendableRouter.get('/expendables', async (req: Request, res: Response) => {
  try {
    const expendables = await Expendable.find();
    res.json(expendables);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expendable
expendableRouter.post('/expendables', async (req: Request, res: Response) => {
  const expendable = new Expendable({
    name: req.body.name,
    code: req.body.code,
    category: req.body.category,
    certificate: req.body.certificate,
    quantity: req.body.quantity,
    unit: req.body.unit,
    unitPrice: req.body.unitPrice,
    store: req.body.store,
    project: req.body.project,
    user: req.body.user,
  });

  try {
    const savedExpendable = await expendable.save();
    res.status(201).send(savedExpendable);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a expendable by id
expendableRouter.get(
  '/expendables/:id',
  async (req: Request, res: Response) => {
    try {
      const expendable = await Expendable.findById(req.params.id);
      res.status(200).send(expendable);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Update a expendable
expendableRouter.put(
  '/expendables/:id',
  async (req: Request, res: Response) => {
    try {
      const expendable = await Expendable.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );

      res.status(200).send(expendable);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Delete a expendable
expendableRouter.delete(
  '/expendables/:id',
  async (req: Request, res: Response) => {
    try {
      const expendable = await Expendable.findByIdAndDelete(req.params.id);
      res.status(200).send(expendable);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

export default expendableRouter;
