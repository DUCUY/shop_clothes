const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getRate, vote } = require("../controller/productController");



router.post("/", verifyTokenAndAdmin, createProduct );
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProduct);
router.post("/ratings", vote);
router.get("/ratings/:productId", getRate);



module.exports = router;