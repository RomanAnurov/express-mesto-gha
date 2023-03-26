const express = require("express");

const Card = require("../models/card");

const INCORRECT_DATA_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;

//Получаем  карточек

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка на сервере" });
    });
};

// Создать карточку

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_ERROR)
          .send({ message: "Переданы некорректные данные" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};

// Удалени карточки по ID

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => {
      if (card) {
        res.send({ message: "Карточка удалена" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_ERROR)
          .send({ message: "Введены не корректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена." });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};

const putLikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail()
    .then((card) => {
      if (card) {
        res.send({ message: "Лайк поставлен" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(INCORRECT_DATA_ERROR).send({
          message: "Переданы некорректные данные для постановки лайка.",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: "Передан несуществующий _id карточки" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};

const deleteLikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail()
    .then((card) => {
      if (card) {
        res.send({ message: "Лайк удалён" });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INCORRECT_DATA_ERROR)
          .send({ message: "Переданы некорректные данные для снятия лайка." });
      } else if (err.name === "DocumentNotFoundError") {
        res
          .status(404)
          .send({ message: "Передан несуществующий _id карточки" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLikeCard,
  deleteLikeCard,
};
