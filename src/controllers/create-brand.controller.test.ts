import { createBrandController } from './create-brand.controller';
import { BrandServiceInterface } from '../services/brand.service';
import { Request, Response } from 'express';

describe('createBrandController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let brandService: Partial<BrandServiceInterface>;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Brand'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    brandService = {
      create: jest.fn()
    };
  });

  test('should create a new brand and return 201 status', async () => {
    const newBrand = { id: 1, name: 'Test Brand' };
    (brandService.create as jest.Mock).mockResolvedValue(newBrand);

    const controller = createBrandController(brandService as BrandServiceInterface);

    await controller(req as Request, res as Response);

    expect(brandService.create).toHaveBeenCalledWith({ name: 'Test Brand' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: newBrand, message: 'brand successfully created' });
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error creating brand';
    (brandService.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const controller = createBrandController(brandService as BrandServiceInterface);

    await controller(req as Request, res as Response);

    expect(brandService.create).toHaveBeenCalledWith({ name: 'Test Brand' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: new Error(errorMessage) });
  });
});
