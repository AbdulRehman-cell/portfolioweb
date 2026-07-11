const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const sendConfirmationEmail = require('./mailer');
require('dotenv').config();

// Use cookieParser middleware (if this router is used standalone)
router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  const username = req.cookies.username;
  const useremail = req.cookies.useremail;

  if (username && useremail) {
    // Already submitted → show thank you message instead of form
    res.render("index", { sstatus: 1, name: username, email: useremail });
  } else {
    // No cookies yet → show form
    res.render("index", { sstatus: 0 });
  }
});

router.get('/project', function(req, res, next) {
  res.render('projects');
});

router.get('/convertor', function(req, res, next) {
  res.render('convertor');
});

router.get('/game', function(req, res, next) {
  res.render('game');
});

router.get('/calculator', function(req, res, next) {
  res.render('calculator');
});

router.get('/weatherapp', function(req, res, next) {
  res.render('weatherapp');
});

router.post('/contact', async function(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Name, email and message are required.');
  }

  res.cookie("username", name, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  res.cookie("useremail", email, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

  // Send confirmation email using mailer.js utility
  try {
    await sendConfirmationEmail(email, name, message);
    console.log('Email sent successfully');
    res.render('index', { sstatus: 1, name, email }); // Show thank you message
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;