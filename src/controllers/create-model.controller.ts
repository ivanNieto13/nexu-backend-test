import { Request, Response } from 'express';
import { ModelServiceInterface } from '../services/model.service';

export const createModelController = (modelService: ModelServiceInterface) => {
  return (async (req: Request, res: Response) => {
    const input: Partial<ModelEntityInterface> = {
      name: req.body.name,
      brand_id: Number(req.params.id),
    };
    if (req.body.average_price) {
      input.average_price = Number(req.body.average_price);
    }

    try {
      const model = await modelService.create(input);
      res.status(201);
      res.json({ data: model, message: `model successfully created`});
    } catch (err) {
      res.status(500);
      res.json({ message: err });
    }
  });
}

