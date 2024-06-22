import { Router } from 'express';
import { updateAveragePriceController } from '../controllers/model.controller';
import { ModelServiceInterface } from '../services/model.service';

const router = Router();

export const modelRouter = (modelService: ModelServiceInterface) => {
  router.route('/:id')
    .put(updateAveragePriceController(modelService));

  return router;
}
