const express = require('express');
const router = express.Router();
const { verifyToken ,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder,
    getIncome, approvedOrder, refuseOrder,
    shippingOrder
} = require("../controller/orderController");


router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/income", verifyTokenAndAdmin, getIncome);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);

router.post("/", verifyToken, createOrder);
router.post("/approvedOrder/:orderId", verifyTokenAndAdmin, approvedOrder);
router.post("/refuseOrder/:orderId", verifyTokenAndAdmin, refuseOrder);
router.post("/shippingOrder/:orderId",verifyTokenAndAdmin, shippingOrder);

router.put("/:id", verifyTokenAndAdmin, updateOrder);

router.delete("/:id", verifyTokenAndAdmin, deleteOrder);




module.exports = router;