import { Request, Response } from 'express';
import { ModelServiceInterface } from '../services/model.service';

export const getModelsController = (modelService: ModelServiceInterface) => {
  return (async (req: Request, res: Response) => {
    try {
      const models = await modelService.getModels();
      res.status(200);
      res.json(models);
    } catch (err) {
      res.status(500);
      res.json({ message: err });
    }
  });
}
