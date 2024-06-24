import {Request, Response} from 'express';
import {ModelServiceInterface} from '../services/model.service';
import {getModelsFiltersDto} from '../dto/get-models-filters.dto';

export const getModelsByBrandController = (
  modelService: ModelServiceInterface
) => {
  return async (req: Request, res: Response) => {
    try {
      const input: Partial<getModelsFiltersDto> = {
        brand_id: req.params.id,
      };
      const models = await modelService.getModels(input as getModelsFiltersDto);
      res.status(200);
      res.json(models);
    } catch (err) {
      res.status(500);
      res.json({message: err});
    }
  };
};
