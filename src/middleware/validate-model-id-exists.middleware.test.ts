import {validateModelIdExistsMiddleware} from './validate-model-id-exists.middleware';
import {ModelServiceInterface} from '../services/model.service';
import {NextFunction, Request, Response} from 'express';

describe('validateModelIdExistsMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let modelService: Partial<ModelServiceInterface>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    modelService = {
      getModelById: jest.fn(),
    };
  });

  test('should return 400 if id is not provided', async () => {
    req.params = {};

    const middleware = validateModelIdExistsMiddleware(
      modelService as ModelServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({message: 'you must provide an id!'});
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 400 if id is invalid', async () => {
    req.params = {id: '-1'};

    const middleware = validateModelIdExistsMiddleware(
      modelService as ModelServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'you must provide a valid id!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 404 if model with id is not found', async () => {
    req.params = {id: '1'};
    (modelService.getModelById as jest.Mock).mockResolvedValue({});

    const middleware = validateModelIdExistsMiddleware(
      modelService as ModelServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'model with id 1 not found',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next if model with id is found', async () => {
    req.params = {id: '1'};
    (modelService.getModelById as jest.Mock).mockResolvedValue({id: 1});

    const middleware = validateModelIdExistsMiddleware(
      modelService as ModelServiceInterface
    );

    await middleware(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
