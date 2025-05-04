import { Router } from 'express';
import { suggest } from './meal.controller';
import { syncMiddleware } from '../middlewares';

const router = Router();

router.post('/suggest', syncMiddleware(suggest));

export default router;
