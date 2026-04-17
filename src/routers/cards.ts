import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, deleteLikeCard,
} from '../controllers/cards';

import { validateCardId, validateCreateCard } from '../middlewares/validation';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:id', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', deleteLikeCard);

export default router;
