const express = require('express');

const viewsControl = require('../controllers/viewsController');
const authControl = require('../controllers/authController');
const bookingControl = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingControl.createBookingCheckout,
  authControl.isLoggedIn,
  viewsControl.getOverview
);
router.get('/tour/:slug', authControl.isLoggedIn, viewsControl.getTour);
router.get('/login', authControl.isLoggedIn, viewsControl.login);
router.get('/signup', authControl.isLoggedIn, viewsControl.signUp);
router.get('/me', authControl.protect, viewsControl.getAccount);
router.get('/my-tours', authControl.protect, viewsControl.getMyTours);
// router.post('/me', authControl.protect);

router.post(
  '/submit-user-data',
  authControl.protect,
  viewsControl.updateUserData
);

module.exports = router;
