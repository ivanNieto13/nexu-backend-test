import { Router } from 'express';
import { updateAveragePriceController } from '../controllers/model.controller';
import { ModelServiceInterface } from '../services/model.service';
import { validateAveragePriceMiddleware } from '../middleware/validate-average-price.middleware';

const router = Router();

export const modelRouter = (modelService: ModelServiceInterface) => {
  router.route('/:id')
    .put(
      validateAveragePriceMiddleware,
      updateAveragePriceController(modelService),
    );

  return router;
}
