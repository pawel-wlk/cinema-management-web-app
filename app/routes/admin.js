const express = require('express');

const controller = require('../controllers/AdminController');


const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.email) {
    res.render('pages/admin/index', {
      session: req.session,
      backupList: controller.getBackupNames() || [],
    });
  } else {
    res.render('pages/admin/login', {message: ""});
  }
});

router.post('/', async (req, res, next) => {
  try {
    req.session = await controller.login(req.session, req.body.email, req.body.password);
    res.redirect('/admin');
  }
  catch(e) {
    console.log(e);
    res.render('pages/admin/login', {message:  "cannot login"});
  }
})

router.get('/logout', (req, res) => {
  req.session.email=undefined;
  res.redirect('/admin');
});

router.get('/createbackup', async (req, res) => {
  controller.makeBackup();
  res.redirect('/admin');
});

router.get('/addadmin', (req,res) => {
  res.render('pages/admin/addAdmin', {message: ""});
});

router.post('/addadmin', async (req, res) => {
  try {
    await controller.registerNewAdmin(req.body.email, req.body.password);
    res.redirect('/admin');
  }
  catch(e) {
    console.log(e);
    res.render('pages/admin/addManager', {message:  "cannot create"});
  }
})

router.get('/addmanager', (req,res) => {
  res.render('pages/admin/addManager', {message: ""});
});

router.post('/addmanager', async (req, res) => {
  try {
    await controller.registerNewAdmin(req.body.email, req.body.password);
    res.redirect('/admin');
  }
  catch(e) {
    console.log(e);
    res.render('pages/admin/newdManager', {message:  "cannot create"});
  }
})

module.exports = router;
