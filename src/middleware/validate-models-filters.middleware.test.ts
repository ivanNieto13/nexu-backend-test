import { validateModelsFiltersMiddleware } from './validate-models-filters.middleware';
import { NextFunction, Request, Response } from 'express';
import { MIN_AVG_PRICE } from './constants';

describe('validateModelsFiltersMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should return 400 if greater query param is not a valid number', async () => {
    req.query = { greater: 'abc' };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'you must provide a valid number' });
    expect(next).not.toHaveBeenCalled();
  });

  test(`should return 400 if greater query param is less than ${MIN_AVG_PRICE}`, async () => {
    req.query = { greater: (MIN_AVG_PRICE - 1).toString() };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `greater price invalid, must be ${MIN_AVG_PRICE} at least` });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if lower query param is not a valid number', async () => {
    req.query = { lower: 'abc' };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'you must provide a valid number' });
    expect(next).not.toHaveBeenCalled();
  });

  test(`should return 400 if lower query param is less than ${MIN_AVG_PRICE}`, async () => {
    req.query = { lower: (MIN_AVG_PRICE - 1).toString() };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: `lower price invalid, must be ${MIN_AVG_PRICE} at least` });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if greater query param is valid', async () => {
    req.query = { greater: (MIN_AVG_PRICE + 1).toString() };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should call next if lower query param is valid', async () => {
    req.query = { lower: (MIN_AVG_PRICE + 1).toString() };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should call next if both query params are valid', async () => {
    req.query = { greater: (MIN_AVG_PRICE + 1).toString(), lower: (MIN_AVG_PRICE + 1).toString() };

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should call next if no query params are provided', async () => {
    req.query = {};

    const middleware = validateModelsFiltersMiddleware;

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
