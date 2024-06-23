import { Router } from 'express';
import { updateAveragePriceController } from '../controllers/model.controller';
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

  return router;
}
