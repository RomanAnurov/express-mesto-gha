const router = require("express").Router();

const  { getUsers, createUser, getUserById, updateUserInfo, updateUserAvatar } = require("../controllers/users");

router.get("/users", getUsers);

router.post("/users", createUser);

router.get("/users/:userId", getUserById);

router.patch("/users/me", updateUserInfo);

router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;
