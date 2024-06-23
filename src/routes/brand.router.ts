import { Router } from 'express';
import { BrandServiceInterface } from '../services/brand.service';
import { getAllBrandsController } from '../controllers';
import { ModelServiceInterface } from '../services/model.service';
import { getModelsByBrandController } from '../controllers/get-models-by-brand.controller';

const router = Router();

export const brandRouter = (
  brandService: BrandServiceInterface,
  modelService: ModelServiceInterface,
) => {
  router.route('/')
    .get(
      getAllBrandsController(brandService),
    );
  router.route('/:id/models')
    .get(
      getModelsByBrandController(modelService),
    );

  return router;
};
