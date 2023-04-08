const router = require('express').Router();

const { createCardValidation } = require('../middlewares/celebrate-validate');

const {
  getCards,
  createCard,
  deleteCardById,
  putLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', putLikeCard);

router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
