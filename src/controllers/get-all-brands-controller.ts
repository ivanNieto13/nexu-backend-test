import { BrandServiceInterface } from '../services/brand.service';
import { Request, Response } from 'express';

export const getAllBrandsController = (brandService: BrandServiceInterface) => {
  return (async (req: Request, res: Response) => {
    try {
      const brands = await brandService.getBrands();
      res.status(200);
      res.json(brands);
    } catch (err) {
      res.status(500);
      res.json({ message: err });
    }
  });
}
