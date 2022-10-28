import Equipment from '../models/Equipment';
import express, { Request, Response } from 'express';

const equipmentRouter = express.Router();

// Get all equipments
equipmentRouter.get('/equipments', async (req: Request, res: Response) => {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new equipment
equipmentRouter.post('/equipments', async (req: Request, res: Response) => {
  const equipment = new Equipment({
    name: req.body.name,
    code: req.body.code,
    category: req.body.category,
    specification: req.body.specification,
    calibrationDate: req.body.calibrationDate,
    quantity: req.body.quantity,
    dailyPrice: req.body.dailyPrice,
    store: req.body.store,
    project: req.body.project,
    user: req.body.user,
  });

  try {
    const savedEquipment = await equipment.save();
    res.status(201).send(savedEquipment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a equipment by id
equipmentRouter.get('/equipments/:id', async (req: Request, res: Response) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    res.status(200).send(equipment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a equipment
equipmentRouter.put('/equipments/:id', async (req: Request, res: Response) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).send(equipment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a equipment
equipmentRouter.delete(
  '/equipments/:id',
  async (req: Request, res: Response) => {
    try {
      const equipment = await Equipment.findByIdAndDelete(req.params.id);
      res.status(200).send(equipment);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

export default equipmentRouter;
