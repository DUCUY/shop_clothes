const express = require('express');
const { getPayMent } = require('../controller/paymentController');
const router = express.Router();



router.get('/config',  getPayMent )




module.exports = router;