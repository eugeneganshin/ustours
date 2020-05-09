const express = require('express');
const reviewControll = require('../controllers/reviewController');
const authControll = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewControll.getAllReviews)
  .post(
    authControll.protect,
    authControll.restrict('user'),
    reviewControll.setTourAndUserIDs,
    reviewControll.createReview
  );

router
  .route('/:id')
  .get(reviewControll.getReview)
  .patch(reviewControll.updateReview)
  .delete(reviewControll.deleteReview);
module.exports = router;
