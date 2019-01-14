const express = require('express');

const controller = require('../controllers/UserController');


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.render('pages/user/index');
});

router.get('/test', async (req, res, next) => {
  try {
    res.status(200);
    const a = await controller.test();
    res.send(a);
  }
  catch (e) {
    next(e);
  }
})

module.exports = router;
