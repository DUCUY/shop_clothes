const express = require('express');
const router = express.Router();

const { createUser, login, logout, createAdmin } = require("../controller/auth");
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.post("/register", createUser);
router.post("/register-admin",verifyTokenAndAdmin, createAdmin);
router.post("/login", login);
router.post("/logout", verifyTokenAndAuthorization, logout);





module.exports = router;