import { Router } from 'express';
import { register, login, update, loginAdmin, getAllUser } from './user.controller';
import { syncMiddleware } from '../middlewares';
import { checkUserExists, checkAdminExists } from '@/middlewares/firewall';

const router = Router();

router.post('/register', syncMiddleware(register));
router.post('/login', syncMiddleware(login));
router.post('/admin/login', syncMiddleware(loginAdmin));
router.post('/:userId', syncMiddleware(checkUserExists), syncMiddleware(update));

router.get('/admin/users', syncMiddleware(checkAdminExists), syncMiddleware(getAllUser));

export default router;
