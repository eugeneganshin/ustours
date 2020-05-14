const express = require('express');
const bookingControll = require('../controllers/bookingController');
const authControll = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get(
  '/checkout-session/:tourID',
  authControll.protect,
  bookingControll.getCheckoutSession
);

module.exports = router;
