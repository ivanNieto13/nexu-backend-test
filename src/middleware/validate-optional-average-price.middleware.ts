import { NextFunction, Request, Response } from 'express';
import { validateAveragePriceMiddleware } from './validate-average-price.middleware';

export const validateOptionalAveragePriceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.average_price) {
    validateAveragePriceMiddleware(req, res, next);
  } else {
    next();
  }
}
