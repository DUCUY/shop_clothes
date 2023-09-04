const express = require('express');
const router = express.Router();

const { createComment, getComments, deleteComment } = require("../controller/commentController");
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.post("/", verifyTokenAndAuthorization, createComment);
router.get("/:productId", verifyTokenAndAuthorization, getComments);
router.delete("/:commentId", verifyTokenAndAdmin, deleteComment);




module.exports = router;