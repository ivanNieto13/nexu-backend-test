import {Request, Response} from 'express';
import {ModelServiceInterface} from '../services/model.service';
import {getModelsFiltersDto} from '../dto/get-models-filters.dto';

export const getModelsController = (modelService: ModelServiceInterface) => {
  return async (req: Request, res: Response) => {
    try {
      const filters: Partial<getModelsFiltersDto> = {
        greater: req.query.greater,
        lower: req.query.lower,
      };
      const models = await modelService.getModels(
        filters as getModelsFiltersDto
      );
      res.status(200);
      res.json(models);
    } catch (err) {
      res.status(500);
      res.json({message: err});
    }
  };
};
