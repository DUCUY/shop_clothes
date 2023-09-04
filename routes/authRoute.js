const express = require('express');
const router = express.Router();

const { createUser, login, logout } = require("../controller/auth");
const {  verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", verifyTokenAndAuthorization, logout);





module.exports = router;