const express = require('express');

const viewsControl = require('../controllers/viewsController');
const authControl = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsControl.getOverview);
router.get('/tour/:slug', authControl.protect, viewsControl.getTour);
router.get('/login', viewsControl.login);
router.get('/signup', viewsControl.signUp);

module.exports = router;
