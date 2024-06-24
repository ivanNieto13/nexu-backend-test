import {NextFunction, Request, Response} from 'express';
import {modelPresentInBrandMiddleware} from './model-present-in-brand.middleware';
import {ModelServiceInterface} from '../services/model.service';

describe('modelPresentInBrandMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let modelService: ModelServiceInterface;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    modelService = {
      modelPresentInBrand: jest.fn(),
    } as unknown as ModelServiceInterface;
  });

  test('should return 400 if id is not provided', async () => {
    req.params = {};
    req.body = {name: 'TestModel'};

    const middleware = modelPresentInBrandMiddleware(modelService);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({message: 'you must provide an id!'});
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if model name is not provided', async () => {
    req.params = {id: '1'};
    req.body = {name: ''};

    const middleware = modelPresentInBrandMiddleware(modelService);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide a model name',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if id is invalid', async () => {
    req.params = {id: '-1'};
    req.body = {name: 'TestModel'};

    const middleware = modelPresentInBrandMiddleware(modelService);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide a valid id!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 409 if model name is already present in brand', async () => {
    req.params = {id: '1'};
    req.body = {name: 'TestModel'};

    modelService.modelPresentInBrand = jest.fn().mockResolvedValue(true);

    const middleware = modelPresentInBrandMiddleware(modelService);

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'model with name testmodel is already taken',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if request is valid', async () => {
    req.params = {id: '1'};
    req.body = {name: 'TestModel'};

    modelService.modelPresentInBrand = jest.fn().mockResolvedValue(false);

    const middleware = modelPresentInBrandMiddleware(modelService);

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
