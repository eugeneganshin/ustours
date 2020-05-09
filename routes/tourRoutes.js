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
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrict('admin', 'lead-guide', 'guide'),
    tourControl.getMonthlyPlan
  );

router
  .route('/')
  .get(tourControl.getAllTours)
  .post(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourControl.createTour
  );

router
  .route('/:id')
  .get(tourControl.getTour)
  .patch(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourControl.updateTour
  )
  .delete(
    authController.protect,
    authController.restrict('admin', 'lead-guide'),
    tourControl.deleteTour
  );

module.exports = router;
