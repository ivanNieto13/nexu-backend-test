import {NextFunction, Request, Response} from 'express';
import {BrandServiceInterface} from '../services/brand.service';

export const validateBrandNameExistsMiddleware = (
  brandService: BrandServiceInterface
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || String(req.body.name).trimEnd().trimStart() === '') {
      res.status(400).json({message: 'you must provide a name!'});

      return;
    }

    const name = String(req.body.name).trimStart().trimEnd().toLowerCase();
    const model = await brandService.getBrandByName(name);

    if (model.length) {
      res
        .status(409)
        .json({message: `brand with name ${req.body.name} already exists`});

      return;
    }

    next();
  };
};
