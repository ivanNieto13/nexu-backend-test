import { Request, Response } from 'express';
import { ModelServiceInterface } from '../services/model.service';

export const updateAveragePriceController = (modelService: ModelServiceInterface) => {
  return (async (req: Request, res: Response) => {
    const dto: UpdateAveragePriceDto = {
      id: Number(req.params.id),
      averagePrice: req.body.averagePrice,
    };

    try {
      const model = await modelService.updateAveragePrice(dto);
      res.status(201);
      res.json({ message: `model with id ${model.id} set average price to ${model.averagePrice} successfully.`});
    } catch (err) {
      res.status(500);
      res.json({ message: err });
    }
  });
}

