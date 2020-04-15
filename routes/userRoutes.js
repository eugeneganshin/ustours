const express = require('express');
const userControl = require('../controllers/userController');

const router = express.Router();

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
