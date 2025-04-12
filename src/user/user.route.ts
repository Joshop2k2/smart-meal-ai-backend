import { Router } from 'express';
import { register, login } from './user.controller';
import { syncMiddleware } from '../middlewares';

const router = Router();

router.post('/register', syncMiddleware(register));
router.post('/login', syncMiddleware(login));

export default router;
