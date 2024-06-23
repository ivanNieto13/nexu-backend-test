import { NextFunction, Request, Response } from 'express';

const MIN_AVG_PRICE = 100000;

export const validateModelsFiltersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.greater) {
    if (isNaN(Number(req.query.greater))) {
      res.status(400).json({ message: 'you must provide a valid number' });

      return;
    }

    if (Number(req.query.greater) < MIN_AVG_PRICE) {
      res.status(400).json({ message: `greater price invalid, must be ${MIN_AVG_PRICE} at least` });

      return;
    }
  }

  if (req.query.lower) {
    if (isNaN(Number(req.query.lower))) {
      res.status(400).json({ message: 'you must provide a valid number' });

      return;
    }

    if (Number(req.query.lower) < MIN_AVG_PRICE) {
      res.status(400).json({ message: `lower price invalid, must be ${MIN_AVG_PRICE} at least` });

      return;
    }
  }

  next();
}
