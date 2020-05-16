const express = require('express');
const bookingControll = require('../controllers/bookingController');
const authControll = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authControll.protect);

router.get('/checkout-session/:tourID', bookingControll.getCheckoutSession);

router.use(authControll.restrict('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingControll.getAllBookings)
  .post(bookingControll.createBooking);

router
  .route('/:id')
  .get(bookingControll.getBooking)
  .patch(bookingControll.updateBookings)
  .delete(bookingControll.deleteBooking);

module.exports = router;
