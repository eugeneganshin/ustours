const express = require('express');
const tourControl = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

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

module.exports = router;
