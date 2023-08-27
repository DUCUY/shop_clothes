const express = require('express');
const router = express.Router();
const { verifyToken ,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { createCart, updateCart, deleteCart, getCart, getAllCart } = require("../controller/cartController");

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndAdmin, getAllCart);


module.exports = router;