import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';

interface IError extends Error {
    statusCode?: number;
}

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate('owner')
  .then((cards) => { res.send({ data: cards }); })
  .catch((err) => {
    const error = new Error(err.message) as IError;
    error.statusCode = 500;

    next(error);
  });

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  return new Card({ owner: userId, name, link }).save()
    .then((newCard) => res.status(201).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Передан некорректный ID карточки') as IError;
        error.statusCode = 400;

        next(error);
        return;
      }
      if (err.name === 'ValidationError') {
        const error = new Error('Переданы некорректные данные') as IError;
        error.statusCode = 400;

        next(error);
        return;
      }
      const error = new Error(err.message) as IError;
      error.statusCode = 500;

      next(error);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  const cardIdVar = req.params.cardId;

  Card.findById(cardIdVar)
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка не найдена') as IError;
        error.statusCode = 404;

        next(error);
        return;
      }

      if (card.owner.toString() !== userId) {
        const error = new Error('Нет прав для удаления чужой карточки') as IError;
        error.statusCode = 403;

        next(error);
        return;
      }

      card.deleteOne()
        .then(() => {
          res.send({ message: 'Карточка успешно удалена', data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Передан некорректный ID карточки') as IError;
        error.statusCode = 400;

        next(error);
        return;
      }
      if (err.name === 'ValidationError') {
        const error = new Error('Переданы некорректные данные') as IError;
        error.statusCode = 400;

        next(error);
        return;
      }
      const error = new Error(err.message) as IError;
      error.statusCode = 500;

      next(error);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка не найдена') as IError;
        error.statusCode = 404;
        next(error);
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Передан некорректный ID карточки') as IError;
        error.statusCode = 400;
        next(error);
        return;
      }
      if (err.name === 'ValidationError') {
        const error = new Error('Переданы некорректные данные') as IError;
        error.statusCode = 400;
        next(error);
        return;
      }
      const error = new Error(err.message) as IError;
      error.statusCode = 500;

      next(error);
    });
};

export const deleteLikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Карточка не найдена') as IError;
        error.statusCode = 404;
        next(error);
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('Передан некорректный ID карточки') as IError;
        error.statusCode = 400;
        next(error);
        return;
      }
      if (err.name === 'ValidationError') {
        const error = new Error('Переданы некорректные данные') as IError;
        error.statusCode = 400;
        next(error);
        return;
      }
      const error = new Error(err.message) as IError;
      error.statusCode = 500;

      next(error);
    });
};
