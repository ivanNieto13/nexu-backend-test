import {Router} from 'express';
import {BrandServiceInterface} from '../services/brand.service';
import {getAllBrandsController} from '../controllers';
import {ModelServiceInterface} from '../services/model.service';
import {getModelsByBrandController} from '../controllers/get-models-by-brand.controller';
import {
  validateBrandIdExistsMiddleware,
  validateBrandNameExistsMiddleware,
  validateOptionalAveragePriceMiddleware,
} from '../middleware';
import {createBrandController} from '../controllers/create-brand.controller';
import {modelPresentInBrandMiddleware} from '../middleware/model-present-in-brand.middleware';
import {createModelController} from '../controllers/create-model.controller';

const router = Router();

export const brandRouter = (
  brandService: BrandServiceInterface,
  modelService: ModelServiceInterface
) => {
  router
    .route('/')
    .post(
      validateBrandNameExistsMiddleware(brandService),
      createBrandController(brandService)
    )
    .get(getAllBrandsController(brandService));
  router
    .route('/:id/models')
    .post(
      validateOptionalAveragePriceMiddleware,
      validateBrandIdExistsMiddleware(brandService),
      modelPresentInBrandMiddleware(modelService),
      createModelController(modelService)
    )
    .get(
      validateBrandIdExistsMiddleware(brandService),
      getModelsByBrandController(modelService)
    );

  return router;
};
