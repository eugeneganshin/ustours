const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
  const response = req.body.read;
  const data = `I got some JSON: ${response}`;
  res.send(data);
});

module.exports = router;
