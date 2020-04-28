const express = require('express');
const tourControl = require('../controllers/tourController');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(tourControl.getAllTours)
  .post(tourControl.createTour);

router
  .route('/top-5-cheap')
  .get(tourControl.aliasTopTours, tourControl.getAllTours);

router
  .route('/:id')
  .get(tourControl.getTour)
  .patch(tourControl.updateTour)
  .delete(tourControl.deleteTour);

module.exports = router;
