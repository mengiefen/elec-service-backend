import Reservation from '../models/Reservation';
import express, { Request, Response } from 'express';

const reservationRouter = express.Router();

// Get all reservations
reservationRouter.get('/reservations', async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new reservation
reservationRouter.post('/reservations', async (req: Request, res: Response) => {
  const reservation = new Reservation({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    store: req.body.store,
    project: req.body.project,
    user: req.body.user,
    items: req.body.items,
  });

  try {
    const savedReservation = await reservation.save();
    res.status(201).send(savedReservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a reservation by id
reservationRouter.get(
  '/reservations/:id',
  async (req: Request, res: Response) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      res.status(200).send(reservation);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Update a reservation
reservationRouter.put(
  '/reservations/:id',
  async (req: Request, res: Response) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );
      res.status(200).send(reservation);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

// Delete a reservation
reservationRouter.delete(
  '/reservations/:id',
  async (req: Request, res: Response) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      res.status(200).send(reservation);
    } catch (error) {
      res.status(400).send(error);
    }
  },
);

export default reservationRouter;
