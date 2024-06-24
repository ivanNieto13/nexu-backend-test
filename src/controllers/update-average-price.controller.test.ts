import { updateAveragePriceController } from './update-average-price.controller';
import { ModelServiceInterface } from '../services/model.service';
import { Request, Response } from 'express';

describe('updateAveragePriceController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let modelService: Partial<ModelServiceInterface>;

  beforeEach(() => {
    req = {
      params: {
        id: '1'
      },
      body: {
        average_price: 200000
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    modelService = {
      updateAveragePrice: jest.fn()
    };
  });

  test('should update average price and return 201 status', async () => {
    const updatedModel = { id: 1, average_price: 200000 };
    (modelService.updateAveragePrice as jest.Mock).mockResolvedValue(updatedModel);

    const controller = updateAveragePriceController(modelService as ModelServiceInterface);

    await controller(req as Request, res as Response);

    expect(modelService.updateAveragePrice).toHaveBeenCalledWith({
      id: 1,
      average_price: 200000
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `model with id ${updatedModel.id} set average price to ${updatedModel.average_price} successfully.`
    });
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error updating average price';
    (modelService.updateAveragePrice as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const controller = updateAveragePriceController(modelService as ModelServiceInterface);

    await controller(req as Request, res as Response);

    expect(modelService.updateAveragePrice).toHaveBeenCalledWith({
      id: 1,
      average_price: 200000
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: new Error(errorMessage) });
  });
});
