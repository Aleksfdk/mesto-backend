import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import { validateLogin, validateCreateUser } from '../middlewares/validation';
import authMiddleware from '../middlewares/auth';
import usersRouter from './users';
import cardsRouter from './cards';

const router = Router();

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(authMiddleware);
router.use(usersRouter);
router.use(cardsRouter);

export default router;
