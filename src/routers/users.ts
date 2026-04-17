import { Router } from 'express';
import {
  getUsers, getUserId, changeProfile, changeProfileAvatar, getCurrentUser,
} from '../controllers/users';

import { validateUserId, validateUpdateProfile, validateUpdateAvatar } from '../middlewares/validation';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', validateUserId, getUserId);
router.patch('/users/me', validateUpdateProfile, changeProfile);
router.get('/users/me', getCurrentUser);
router.patch('/users/me/avatar', validateUpdateAvatar, changeProfileAvatar);

export default router;
