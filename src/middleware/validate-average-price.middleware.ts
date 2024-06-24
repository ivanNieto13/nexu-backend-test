import {NextFunction, Request, Response} from 'express';
import {MIN_AVG_PRICE} from './constants';

export const validateAveragePriceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isNaN(Number(req.body.average_price))) {
    res.status(400).json({message: 'you must provide a valid number'});

    return;
  }
  if (!req.body.average_price) {
    res.status(400).json({message: 'you must provide an average price!'});

    return;
  }
  if (Number(req.body.average_price) < MIN_AVG_PRICE) {
    res.status(400).json({
      message: `average price invalid, must be ${MIN_AVG_PRICE} at least`,
    });

    return;
  }

  next();
};
