const express = require('express');
const tourControl = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourControl.aliasTopTours, tourControl.getAllTours);

router.route('/tour-stats').get(tourControl.getTourStats);
router.route('/monthly-plan/:year').get(tourControl.getMonthlyPlan);

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(tourControl.getAllTours)
.post(tourControl.createTour);

router
  .route('/:id')
  .get(tourControl.getTour)
  .patch(tourControl.updateTour)
  .delete(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourControl.deleteTour
  );

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrict('user'),
//     reviewController.createReview
//   );

module.exports = router;
