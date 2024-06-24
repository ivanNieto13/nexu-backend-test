import { validateBrandIdExistsMiddleware } from './validate-brand-id-exists.middleware';
import { BrandServiceInterface } from '../services/brand.service';
import { NextFunction, Request, Response } from 'express';

describe('validateBrandIdExistsMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let brandService: Partial<BrandServiceInterface>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    brandService = {
      getBrandById: jest.fn()
    };
  });

  test('should return 400 if id is not provided', async () => {
    req.params = {};

    const middleware = validateBrandIdExistsMiddleware(brandService as BrandServiceInterface);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'you must provide an id!' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if id is invalid', async () => {
    req.params = { id: '-1' };

    const middleware = validateBrandIdExistsMiddleware(brandService as BrandServiceInterface);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'you must provide a valid id!' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 404 if brand with id is not found', async () => {
    req.params = { id: '1' };
    (brandService.getBrandById as jest.Mock).mockResolvedValue({});

    const middleware = validateBrandIdExistsMiddleware(brandService as BrandServiceInterface);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'brand with id 1 not found' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if brand with id is found', async () => {
    req.params = { id: '1' };
    (brandService.getBrandById as jest.Mock).mockResolvedValue({ id: 1 });

    const middleware = validateBrandIdExistsMiddleware(brandService as BrandServiceInterface);

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
