var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();

let sstatus;

/* GET home page. */
router.get('/', function(req, res, next) {

  const { username, useremail } = req.cookies;

  if (username && useremail) {
    // Already submitted → show thank you message instead of form
    res.render("index", { sstatus: 1, name: username, email: useremail });
  } else {
    // No cookies yet → show form
    res.render("index", { sstatus:0 });
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

    res.cookie("username", name, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.cookie("useremail", email, { maxAge: 30 * 24 * 60 * 60 * 1000 });

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abdulrehmanishaque32@gmail.com',
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  // Email options
  const mailOptions = {
    from: 'abdulrehmanishaque32@gmail.com',
    to: email,
    subject: 'Thanks for Reaching Out – Abdul Rehman | Web Developer',
    html: `
<p>Hi <strong>${name}</strong>,</p>

<p>Thank you for reaching out. I’ve received your message:</p>

<blockquote>${message}</blockquote>

<p>I’ll get back to you soon.</p>

<br>

<p>
  Best regards,<br>
  Abdul Rehman Ishaque<br>
  Full Stack Web Developer
</p>

<p>
  <a href="https://wa.me/923009547799" target="_blank" 
     style="display:inline-flex; align-items:center; background-color:#25D366; 
            color:white; padding:10px 16px; border-radius:8px; 
            font-family:Arial, sans-serif; font-size:14px; text-decoration:none;"> 
    Contact through Whatsapp
  </a>
</p>


    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.render('index',{sstatus:1,name, email}); // Redirect to homepage or thank-you page
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;
