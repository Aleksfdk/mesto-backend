import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, deleteLikeCard,
} from '../controllers/cards';

import { validateCardId, validateCreateCard } from '../middlewares/validation';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, deleteLikeCard);

export default router;
