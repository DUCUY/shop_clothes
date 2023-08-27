const express = require('express');
const router = express.Router();
const { verifyToken ,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder, getIncome } = require("../controller/orderController");

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/income", verifyTokenAndAdmin, getIncome);


module.exports = router;