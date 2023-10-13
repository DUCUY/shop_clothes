const express = require('express');
const router = express.Router();
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { updateUsers, deleteUser, getUser, getAllUsers, statsUser, getFavorites, createFavorites, deleteFavorites, updateFavorites, comment, updateComment, deleteComment, getAllComments  } = require("../controller/userController");


router.put("/:id", verifyTokenAndAuthorization, updateUsers);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);

router.get("/stats", verifyTokenAndAdmin, statsUser);

router.post("/favorites/:id", updateFavorites);
router.get("/favorites/:userId", getFavorites);
// router.post("/favorites", verifyTokenAndAuthorization, createFavorites);
// router.delete("/favorites/:userId/:productId", verifyTokenAndAuthorization, deleteFavorites);

router.post("/comments", verifyTokenAndAuthorization, comment);
router.put('/comments/:commentId', verifyTokenAndAuthorization, updateComment);
router.delete('/comments/:commentId', verifyTokenAndAuthorization, deleteComment);
router.get('/products/:productId/comments', verifyTokenAndAuthorization, getAllComments);


module.exports = router;