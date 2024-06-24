import { ModelServiceInterface } from '../services/model.service';
import { NextFunction, Request, Response } from 'express';
import { modelPresentInBrandDto } from '../dto/model-present-in-brand.dto';

export const modelPresentInBrandMiddleware = (modelService: ModelServiceInterface) => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) {
      res.status(400).json({ message: 'you must provide an id!' });

      return;
    }

    if (!req.body.name || String(req.body.name).trimEnd().trimStart() === '') {
      res.status(400).json({ message: 'you must provide a model name' });

      return;
    }

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      res.status(400).json({ message: 'you must provide a valid id!' });

      return;
    }

    const input: modelPresentInBrandDto = {
      brand_id: Number(req.params.id),
      model_name: String(req.body.name).toLowerCase(),
    };
    const modelIsPresent = await modelService.modelPresentInBrand(input);

    if (modelIsPresent) {
      res.status(409).json({ message: `model with name ${input.model_name} is already taken` });

      return;
    }

    next();
  })
}
