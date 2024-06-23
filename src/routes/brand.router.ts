import { Router } from 'express';
import { BrandServiceInterface } from '../services/brand.service';
import { getAllBrandsController } from '../controllers';
import { ModelServiceInterface } from '../services/model.service';
import { getModelsByBrandController } from '../controllers/get-models-by-brand.controller';
import { validateBrandIdExistsMiddleware, validateBrandNameExistsMiddleware } from '../middleware';
import { createBrandController } from '../controllers/create-brand.controller';

const router = Router();

export const brandRouter = (
  brandService: BrandServiceInterface,
  modelService: ModelServiceInterface,
) => {
  router.route('/')
    .post(
      validateBrandNameExistsMiddleware(brandService),
      createBrandController(brandService),
    )
    .get(
      getAllBrandsController(brandService),
    );
  router.route('/:id/models')
    .get(
      validateBrandIdExistsMiddleware(brandService),
      getModelsByBrandController(modelService),
    );

  return router;
};
