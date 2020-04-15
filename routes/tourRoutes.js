const express = require('express');
const tourControl = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourControl.checkID);

router
  .route('/')
  .get(tourControl.getAllTours)
  .post(tourControl.checkBody, tourControl.createTour);

router
  .route('/:id')
  .get(tourControl.getTour)
  .patch(tourControl.updateTour)
  .delete(tourControl.deleteTour);

module.exports = router;
