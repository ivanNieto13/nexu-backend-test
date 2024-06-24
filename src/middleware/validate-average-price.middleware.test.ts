import {NextFunction, Request, Response} from 'express';
import {validateAveragePriceMiddleware} from './';
import {MIN_AVG_PRICE} from './constants';

describe('validateAveragePriceMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should return 400 if average price is not a number', () => {
    req.body = {average_price: 'invalid'};

    validateAveragePriceMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide a valid number',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if average price is not provided', () => {
    req.body = {average_price: null};

    validateAveragePriceMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide an average price!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test(`should return 400 if average price is less than ${MIN_AVG_PRICE}`, () => {
    req.body = {average_price: MIN_AVG_PRICE - 1};

    validateAveragePriceMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: `average price invalid, must be ${MIN_AVG_PRICE} at least`,
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if average price is valid', () => {
    req.body = {average_price: 150000};

    validateAveragePriceMiddleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
