const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct } = require("../controller/productController");



router.post("/", verifyTokenAndAdmin, createProduct );
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProduct);




module.exports = router;