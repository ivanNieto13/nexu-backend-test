import {validateOptionalAveragePriceMiddleware} from './validate-optional-average-price.middleware';
import {validateAveragePriceMiddleware} from './validate-average-price.middleware';
import {NextFunction, Request, Response} from 'express';

jest.mock('./validate-average-price.middleware');

describe('validateOptionalAveragePriceMiddleware', () => {
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
    jest.clearAllMocks();
  });

  test('should call validateAveragePriceMiddleware if average_price is provided', async () => {
    req.body = {average_price: 150000};

    const middleware = validateOptionalAveragePriceMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(validateAveragePriceMiddleware).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if average_price is not provided', async () => {
    req.body = {};

    const middleware = validateOptionalAveragePriceMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(validateAveragePriceMiddleware).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
