import {getModelsController} from './get-models.controller';
import {ModelServiceInterface} from '../services/model.service';
import {Request, Response} from 'express';

describe('getModelsController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let modelService: Partial<ModelServiceInterface>;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    modelService = {
      getModels: jest.fn(),
    };
  });

  test('should return filtered models and status 200', async () => {
    req.query = {
      greater: '100000',
      lower: '200000',
    };
    const models = [
      {id: 1, name: 'Model 1', average_price: 150000},
      {id: 2, name: 'Model 2', average_price: 180000},
    ];
    (modelService.getModels as jest.Mock).mockResolvedValue(models);

    const controller = getModelsController(
      modelService as ModelServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(modelService.getModels).toHaveBeenCalledWith({
      greater: '100000',
      lower: '200000',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(models);
  });

  test('should return all models if no filters are provided and status 200', async () => {
    const models = [
      {id: 1, name: 'Model 1', average_price: 150000},
      {id: 2, name: 'Model 2', average_price: 180000},
    ];
    (modelService.getModels as jest.Mock).mockResolvedValue(models);

    const controller = getModelsController(
      modelService as ModelServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(modelService.getModels).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(models);
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error fetching models';
    (modelService.getModels as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const controller = getModelsController(
      modelService as ModelServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(modelService.getModels).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({message: new Error(errorMessage)});
  });
});
