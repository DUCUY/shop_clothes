const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken } = require("../middlewares/verifyToken");
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getRate, vote, search, discount } = require("../controller/productController");



router.get("/", getAllProduct);
router.post("/search", search)
router.post("/", verifyTokenAndAdmin, createProduct );
router.post("/ratings",verifyToken, vote);
router.post("/discount/:productId",verifyTokenAndAdmin, discount);
router.get("/ratings/:productId", getRate);
router.get("/find/:id", getProduct);
router.patch("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);


module.exports = router;