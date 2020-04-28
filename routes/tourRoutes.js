const express = require('express');
const tourControl = require('../controllers/tourController');

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
  .delete(tourControl.deleteTour);

module.exports = router;
