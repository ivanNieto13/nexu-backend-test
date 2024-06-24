import {Router} from 'express';
import {brandRouter} from './brand.router';
import {modelRouter} from './model.router';
import {ModelService} from '../services/model.service';
import {ModelRepository} from '../repositories/model.repository';
import {getClient} from '../db/db.client';
import {BrandRepository} from '../repositories/brand.repository';
import {BrandService} from '../services/brand.service';

export const router = Router();

const db = getClient();
const modelRepository = new ModelRepository(db);
const modelService = new ModelService(modelRepository);

const brandRepository = new BrandRepository(db);
const brandService = new BrandService(brandRepository);

router.use('/brands', brandRouter(brandService, modelService));
router.use('/models', modelRouter(modelService));
