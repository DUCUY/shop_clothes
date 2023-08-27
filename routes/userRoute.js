const express = require('express');
const router = express.Router();
const {  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { updateUsers, deleteUser, getUser, getAllUsers, statsUser  } = require("../controller/userController");


router.put("/:id", verifyTokenAndAuthorization, updateUsers);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, statsUser);





module.exports = router;