const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userDate = req.body;
  const entredEmail = userDate.email;
  const entredConfirmEmail = userDate['confirm-email'];
  const entredPassword = userDate.password;

  if (!entredEmail || !entredConfirmEmail || !entredPassword || entredPassword.trim() < 6 || entredEmail !== entredConfirmEmail || !entredEmail.includes('@')) {
    console.log('Incorrect data');
    return res.redirect('/dignup');
  }

  const existingUser = await db.getDb().collection('users').findOne({email: entredEmail});

  if (existingUser) {
    console.log('User exists!');
    return res.redirect('signup');
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
    console.log('Could not log in!');
    return res.redirect('/login');
  }

  const passwordAreEqual = await bcrypt.compare(entredPassword, existingUser.password);

  if (!passwordAreEqual) {
    console.log('Could not log in - passwords are not equal!');
    return res.redirect('/login');
  }

  console.log('User is authenticated!');
  res.redirect('/admin');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;
