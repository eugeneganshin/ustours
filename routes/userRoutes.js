const express = require('express');
const userControl = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(userControl.getAllUsers)
  .post(userControl.createUsers);

router
  .route('/:id')
  .get(userControl.getUser)
  .patch(userControl.updateUser)
  .delete(userControl.deleteUser);

module.exports = router;
