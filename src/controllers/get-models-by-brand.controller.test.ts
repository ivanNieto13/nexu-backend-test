import {getModelsByBrandController} from './get-models-by-brand.controller';
import {ModelServiceInterface} from '../services/model.service';
import {Request, Response} from 'express';

describe('getModelsByBrandController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let modelService: Partial<ModelServiceInterface>;

  beforeEach(() => {
    req = {
      params: {
        id: '1',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    modelService = {
      getModels: jest.fn(),
    };
  });

  test('should return models filtered by brand_id and status 200', async () => {
    const models = [
      {id: 1, name: 'Model 1', brand_id: 1},
      {id: 2, name: 'Model 2', brand_id: 1},
    ];
    (modelService.getModels as jest.Mock).mockResolvedValue(models);

    const controller = getModelsByBrandController(
      modelService as ModelServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(modelService.getModels).toHaveBeenCalledWith({brand_id: '1'});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(models);
  });

  test('should return 500 status if an error occurs', async () => {
    const errorMessage = 'Error fetching models by brand';
    (modelService.getModels as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    const controller = getModelsByBrandController(
      modelService as ModelServiceInterface
    );

    await controller(req as Request, res as Response);

    expect(modelService.getModels).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({message: new Error(errorMessage)});
  });
});
