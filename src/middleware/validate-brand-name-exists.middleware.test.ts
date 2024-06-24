import {validateBrandNameExistsMiddleware} from './validate-brand-name-exists.middleware';
import {BrandServiceInterface} from '../services/brand.service';
import {NextFunction, Request, Response} from 'express';

describe('validateBrandNameExistsMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let brandService: Partial<BrandServiceInterface>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    brandService = {
      getBrandByName: jest.fn(),
    };
  });

  test('should return 400 if name is not provided', async () => {
    req.body = {};

    const middleware = validateBrandNameExistsMiddleware(
      brandService as BrandServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide a name!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 409 if brand with name already exists', async () => {
    req.body = {name: 'ExistingBrand'};
    (brandService.getBrandByName as jest.Mock).mockResolvedValue([{}]);

    const middleware = validateBrandNameExistsMiddleware(
      brandService as BrandServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'brand with name ExistingBrand already exists',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if brand name is valid', async () => {
    req.body = {name: 'NewBrand'};
    (brandService.getBrandByName as jest.Mock).mockResolvedValue([]);

    const middleware = validateBrandNameExistsMiddleware(
      brandService as BrandServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
