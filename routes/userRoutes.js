const express = require('express');
const userControl = require('../controllers/userController');
const authController = require('../controllers/authController');
const authControl = require('../controllers/authController');
const reviewControl = require('../controllers/reviewController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.patch(
  '/updateMyPassword',
  authControl.protect,
  authControl.updatePassword
);

router.patch('/updateMe', authControl.protect, userControl.updateMe);
router.delete('/deleteMe', authControl.protect, userControl.deleteMe);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(authControl.protect, userControl.getAllUsers)

router
  .route('/:id')
  .get(userControl.getUser)
  .patch(userControl.updateUser)
  .delete(userControl.deleteUser);

module.exports = router;
