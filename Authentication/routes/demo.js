const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    };
  }

  req.session.inputData = null;

  res.render('signup', {inputData: sessionInputData});
});

router.get('/login', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: ''
    };
  }

  req.session.inputData = null;
  res.render('login', {inputData: sessionInputData});
});

router.post('/signup', async function (req, res) {
  const userDate = req.body;
  const entredEmail = userDate.email;
  const entredConfirmEmail = userDate['confirm-email'];
  const entredPassword = userDate.password;

  if (!entredEmail || !entredConfirmEmail || !entredPassword || entredPassword.trim() < 6 || entredEmail !== entredConfirmEmail || !entredEmail.includes('@')) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check you data.',
      emai: entredEmail,
      confirmEmail: entredConfirmEmail,
      password: entredPassword
    };

    req.session.save(function() {
      res.redirect('/signup');
    });
    return;
  }

  const existingUser = await db.getDb().collection('users').findOne({email: entredEmail});

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'User exists already!',
      email: entredEmail,
      confirmEmail: entredConfirmEmail,
      password: entredPassword
    };
    req.session.save(function() {
      res.redirect('signup');
    });
    return; 
  }

  const hashedPassword = await bcrypt.hash(entredPassword, 12);

  const user = {
    email: entredEmail,
    password: hashedPassword
  };

  const result = await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const entredEmail = userData.email;
  const entredPassword = userData.password;

  const existingUser = await db.getDb().collection('users').findOne({email: entredEmail});

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: entredEmail,
      password: entredPassword
    };
    req.session.save(function() {
      res.redirect('/login');
    });
    return; 
  }

  const passwordAreEqual = await bcrypt.compare(entredPassword, existingUser.password);

  if (!passwordAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: entredEmail,
      password: entredPassword
    };
    req.session.save(function() {
      res.redirect('/login');
    });
    return; 
  }

  req.session.user = { id: existingUser._id, email: existingUser.email};
  req.session.isAuthenticated = true;
  req.session.save(function() {
    res.redirect('/profile');
  });
});

router.get('/admin', async function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }

  if(!res.locals.isAdmin) {
   return res.status(403).render('403');
  }

  res.render('admin');
});

router.get('/profile', function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }
  res.render('profile');
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;

  res.redirect('/');
});

module.exports = router;
