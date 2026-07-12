/**
 * Main Express app entry point
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Simple health endpoint
app.get('/health', (req, res) => res.send('ok'));

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;