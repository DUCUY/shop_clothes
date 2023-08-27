const express = require('express');
const router = express.Router();

const { createUser, login } = require("../controller/auth");

router.post("/register", createUser);
router.post("/login", login);




module.exports = router;