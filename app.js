var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var alphabetRouter = require('./routes/alphabet');
var profileRouter = require('./routes/profile')

var app = express();

// SQLite3 test

// Open database in memory
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/test.db', (err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database');
});

// // Close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.')
// });

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/alphabet', alphabetRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports = app;
