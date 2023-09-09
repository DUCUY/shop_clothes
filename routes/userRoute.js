const express = require('express');
const router = express.Router();
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { updateUsers, deleteUser, getUser, getAllUsers, statsUser, getFavorites, createFavorites, deleteFavorites, updateFavorites, comment  } = require("../controller/userController");


router.put("/:id", verifyTokenAndAuthorization, updateUsers);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, statsUser);
router.patch("/favorites/:id",verifyTokenAndAuthorization, updateFavorites)
// router.post("/favorites", verifyTokenAndAuthorization, createFavorites);
// router.delete("/favorites/:userId/:productId", verifyTokenAndAuthorization, deleteFavorites);
router.get("/favorites/:userId", verifyTokenAndAuthorization, getFavorites);
router.post("/comments", verifyTokenAndAuthorization, comment);







module.exports = router;