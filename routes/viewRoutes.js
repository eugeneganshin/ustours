const express = require('express');

const viewsControl = require('../controllers/viewsController');
const authControl = require('../controllers/authController');

const router = express.Router();

router.get('/', authControl.isLoggedIn, viewsControl.getOverview);
router.get('/tour/:slug', authControl.isLoggedIn, viewsControl.getTour);
router.get('/login', authControl.isLoggedIn, viewsControl.login);
router.get('/signup', authControl.isLoggedIn, viewsControl.signUp);
router.get('/me', authControl.protect, viewsControl.getAccount);
// router.post('/me', authControl.protect);

router.post(
  '/submit-user-data',
  authControl.protect,
  viewsControl.updateUserData
);

module.exports = router;
