import {NextFunction, Request, Response} from 'express';
import {BrandServiceInterface} from '../services/brand.service';

export const validateBrandIdExistsMiddleware = (
  brandService: BrandServiceInterface
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      res.status(400).json({message: 'you must provide an id!'});

      return;
    }

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      res.status(400).json({message: 'you must provide a valid id!'});

      return;
    }

    const id = Number(req.params.id);
    const model = await brandService.getBrandById(id);

    if (!model.id) {
      res
        .status(404)
        .json({message: `brand with id ${req.params.id} not found`});

      return;
    }

    next();
  };
};
