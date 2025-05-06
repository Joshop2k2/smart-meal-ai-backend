import { Router } from 'express';
import { suggest } from './meal.controller';
import { syncMiddleware } from '../middlewares';
import { createMeal, getMeals } from './meal.controller';

const router = Router();

router.post('/suggest', syncMiddleware(suggest));
router.get('/:userId', syncMiddleware(getMeals));
router.post('/:userId', syncMiddleware(createMeal));
export default router;
