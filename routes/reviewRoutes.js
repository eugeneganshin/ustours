const express = require('express');
const reviewControll = require('../controllers/reviewController');
const authControll = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authControll.protect);

router
  .route('/')
  .get(reviewControll.getAllReviews)
  .post(
    authControll.restrict('user'),
    reviewControll.setTourAndUserIDs,
    reviewControll.createReview
  );

router
  .route('/:id')
  .get(reviewControll.getReview)
  .patch(authControll.restrict('user', 'admin'), reviewControll.updateReview)
  .delete(authControll.restrict('user', 'admin'), reviewControll.deleteReview);
module.exports = router;
