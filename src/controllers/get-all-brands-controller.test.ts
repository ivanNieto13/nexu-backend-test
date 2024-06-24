import {getAllBrandsController} from './get-all-brands-controller';
import {BrandServiceInterface} from '../services/brand.service';
import {Request, Response} from 'express';
import {BrandEntityInterface} from '../entities/brand.entity';

describe('getAllBrandsController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let brandService: Partial<BrandServiceInterface>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    brandService = {
      getBrands: jest.fn(),
    };
  });

  test('should return all brands and status 200', async () => {
    const brands: BrandEntityInterface[] = [
      {id: 1, name: 'Brand 1'},
      {id: 2, name: 'Brand 2'},
    ];
    (brandService.getBrands as jest.Mock).mockResolvedValue(brands);

    const controller = getAllBrandsController(
      brandService as BrandServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(brandService.getBrands).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(brands);
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error fetching brands';
    (brandService.getBrands as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const controller = getAllBrandsController(
      brandService as BrandServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(brandService.getBrands).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({message: new Error(errorMessage)});
  });
});
