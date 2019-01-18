const express = require('express');

const controller = require('../controllers/UserController');


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200);
  res.render('pages/user/index', {session: req.session});
});

router.get('/login', async (req, res, next) => {
  res.render('pages/user/login', {message: ""});
})

router.post('/login', async (req, res, next) => {
  try {
    req.session = await controller.login(req.session, req.body.email, req.body.password);
    res.redirect('/');
  }
  catch(e) {
    console.log(e);
    res.render('pages/user/login', {message:  "cannot login"});
  }
})

router.get('/register', async (req, res, next) => {
  res.render('pages/user/register', {message: ""});
})

router.post('/register', async (req, res, next) => {
  try {
    req.session = await controller.registerNewClient(req.session, req.body.email, req.body.password);
    res.redirect('/');
  }
  catch (e) {
    console.log(e);
    res.render('pages/user/register', {message: "cannot register"});
  }
});

router.get('/logout', (req, res) => {
  req.session.email=undefined;
  res.redirect('/');
});

module.exports = router;
