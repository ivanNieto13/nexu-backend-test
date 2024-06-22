import { NextFunction, Request, Response } from 'express';

const MIN_AVG_PRICE = 100000;

export const validateAveragePriceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.averagePrice) {
    res.status(400).json({ message: 'you must provide an average price!' });

    return;
  }
  if (Number(req.body.averagePrice) < MIN_AVG_PRICE) {
    res.status(400).json({ message: `average price invalid, must be ${MIN_AVG_PRICE} at least` });

    return;
  }

  next();
}
