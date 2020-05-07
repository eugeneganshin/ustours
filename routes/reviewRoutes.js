const express = require('express');
const reviewControll = require('../controllers/reviewController');
const authControll = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewControll.getAllReviews)
  .post(
    authControll.protect,
    authControll.restrict('user'),
    reviewControll.createReview
  );

module.exports = router;
