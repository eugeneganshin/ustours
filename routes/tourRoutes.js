const express = require('express');
const tourControl = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourControl.checkID);

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
