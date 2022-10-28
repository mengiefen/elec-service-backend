import Storage from '../models/Storage';
import express, { Request, Response } from 'express';

const storeRouter = express.Router();

// Get all stores
storeRouter.get('/stores', async (req: Request, res: Response) => {
  try {
    const stores = await Storage.find();
    res.json(stores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new store
storeRouter.post('/stores', async (req: Request, res: Response) => {
  const store = new Storage({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    city: req.body.city,
    branch: req.body.branch,
    state: req.body.state,
  });

  try {
    const savedStore = await store.save();
    res.status(201).send(savedStore);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a store by id
storeRouter.get('/stores/:id', async (req: Request, res: Response) => {
  try {
    const store = await Storage.findById(req.params.id);
    res.status(200).send(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a store
storeRouter.put('/stores/:id', async (req: Request, res: Response) => {
  try {
    const store = await Storage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default storeRouter;
