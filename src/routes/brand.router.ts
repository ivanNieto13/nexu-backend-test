import { Router } from 'express';
import { BrandServiceInterface } from '../services/brand.service';
import { getAllBrandsController } from '../controllers';

const router = Router();

export const brandRouter = (brandService: BrandServiceInterface) => {
  router.route('/')
    .get(
      getAllBrandsController(brandService),
    );

  return router;
};
