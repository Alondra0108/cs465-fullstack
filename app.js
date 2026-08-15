var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport');

require('dotenv').config();

// Connect to the database through the API models folder.
require('./app_api/models/db');
require('./app_api/config/passport');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register Handlebars partials
hbs.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for requests from the Angular admin application.
app.use('/api', (req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:4200'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Wire routes to their corresponding routers.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Return JSON for authentication failures from protected API routes.
app.use('/api', function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized: invalid or missing token.' });
  }
  next(err);
});

// Catch 404 and forward to the error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error details in development.
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
