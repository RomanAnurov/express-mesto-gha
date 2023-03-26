const express = require("express");
const INCORRECT_DATA_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;
const User = require("../models/user");

// Получить всех пользователей

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка на сервере" });
    });
};

// Создать пользователя

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => res.send(users))
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

// Получить пользователя по id

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

// Обновить информацию о пользователе

const updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_ERROR)
          .send({ message: "Переданы некорректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};
// Обновить Аватар

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(INCORRECT_DATA_ERROR)
          .send({ message: "Переданы некорректные данные" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "Произошла ошибка на сервере" });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
};
