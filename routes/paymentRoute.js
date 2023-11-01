const express = require('express');
const { getPayMent } = require('../controller/paymentController');
const router = express.Router();
const { verifyToken ,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.get('/config',  getPayMent )




module.exports = router;