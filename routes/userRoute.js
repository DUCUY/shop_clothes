const express = require('express');
const router = express.Router();
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifyToken");
const { updateUsers, deleteUser, getUser, getAllUsers, statsUser, getFavorites, createFavorites, deleteFavorites, updateFavorites, comment, updateComment, deleteComment, getAllComments  } = require("../controller/userController");

router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, statsUser);
router.get("/favorites/:userId", getFavorites);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get('/:productId/comments', getAllComments);


router.post("/comments", comment);
router.post('/comments/:commentId', deleteComment);
router.post("/favorites/:id",verifyToken,updateFavorites);

router.put("/:id", verifyTokenAndAuthorization, updateUsers);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.put('/comments/:commentId', verifyTokenAndAuthorization, updateComment);


module.exports = router;