const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getRate, createRate } = require("../controller/productController");



router.post("/", verifyTokenAndAdmin, createProduct );
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProduct);
router.post("/ratings", verifyTokenAndAuthorization, createRate);
router.get("/ratings/:productId", verifyTokenAndAuthorization, getRate);



module.exports = router;