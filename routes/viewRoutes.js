const express = require('express');

const viewsControl = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsControl.getOverview);

router.get('/tour', viewsControl.getTour);

module.exports = router;
