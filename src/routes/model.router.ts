import { Router } from 'express';
import { getModelsController, updateAveragePriceController } from '../controllers';
import { ModelServiceInterface } from '../services/model.service';
import { validateAveragePriceMiddleware, validateModelIdExistsMiddleware } from '../middleware';

const router = Router();

export const modelRouter = (modelService: ModelServiceInterface) => {
  router.route('/:id')
    .put(
      validateAveragePriceMiddleware,
      validateModelIdExistsMiddleware(modelService),
      updateAveragePriceController(modelService),
    );

  router.route('/')
    .get(
      getModelsController(modelService),
    );

  return router;
}
