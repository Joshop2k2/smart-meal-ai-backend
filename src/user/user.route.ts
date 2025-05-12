import { Router } from 'express';
import { register, login, update } from './user.controller';
import { syncMiddleware } from '../middlewares';
import { checkUserExists } from '@/middlewares/firewall';

const router = Router();

router.post('/register', syncMiddleware(register));
router.post('/login', syncMiddleware(login));
router.post('/:userId', syncMiddleware(checkUserExists), syncMiddleware(update));

export default router;
