import { Request, Response } from 'express';
import { BrandServiceInterface } from '../services/brand.service';
import { BrandEntityInterface } from '../entities/brand.entity';

export const createBrandController = (brandService: BrandServiceInterface) => {
  return (async (req: Request, res: Response) => {
    const input: Partial<BrandEntityInterface> = {
      name: String(req.body.name),
    };

    try {
      const brand = await brandService.create(input);
      res.status(201);
      res.json({ data: brand, message: `brand successfully created`});
    } catch (err) {
      res.status(500);
      res.json({ message: err });
    }
  });
}

