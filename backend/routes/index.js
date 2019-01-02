const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.json({status: "backend works"});
});
router.post('/', (req, res) => {
  res.status(200);
  res.json({status: "backend works"});
});

module.exports = router;
