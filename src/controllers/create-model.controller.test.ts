import { createModelController } from './create-model.controller';
import { ModelServiceInterface } from '../services/model.service';
import { Request, Response } from 'express';

describe('createModelController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let modelService: Partial<ModelServiceInterface>;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Model',
        average_price: 150000
      },
      params: {
        id: '1'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    modelService = {
      create: jest.fn()
    };
  });

  test('should create a new model with average price and return 201 status', async () => {
    const newModel = { id: 1, name: 'Test Model', brand_id: 1, average_price: 150000 };
    (modelService.create as jest.Mock).mockResolvedValue(newModel);

    const controller = createModelController(modelService as ModelServiceInterface);

    await controller(req as Request, res as Response);

    expect(modelService.create).toHaveBeenCalledWith({
      name: 'Test Model',
      brand_id: 1,
      average_price: 150000
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: newModel, message: 'model successfully created' });
  });

  test('should create a new model without average price and return 201 status', async () => {
    const newModel = { id: 1, name: 'Test Model', brand_id: 1 };
    req.body.average_price = undefined;
    (modelService.create as jest.Mock).mockResolvedValue(newModel);

    const controller = createModelController(modelService as ModelServiceInterface);

    await controller(req as Request, res as Response);

    expect(modelService.create).toHaveBeenCalledWith({
      name: 'Test Model',
      brand_id: 1
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: newModel, message: 'model successfully created' });
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error creating model';
    (modelService.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const controller = createModelController(modelService as ModelServiceInterface);

    await controller(req as Request, res as Response);

    expect(modelService.create).toHaveBeenCalledWith({
      name: 'Test Model',
      brand_id: 1,
      average_price: 150000
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: new Error(errorMessage) });
  });
});
