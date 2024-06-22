import { Router } from 'express';
import { modelRouter } from './model.router';
import { ModelService } from '../services/model.service';
import { ModelRepository } from '../repositories/model.repository';
import { getClient } from '../db/db.client';

export const router = Router();

const baseRoutes = [
  {
    path: '/models',
    router: modelRouter,
  }
];

const db = getClient();
const modelRepository = new ModelRepository(db);
const modelService = new ModelService(modelRepository);

baseRoutes.forEach((route) => {
  router.use(route.path, route.router(modelService));
});
