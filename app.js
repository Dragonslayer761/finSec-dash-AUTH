var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const {catchAsync} = require('./Utils/catchAsync');
const {globalErrorHandler} = require('./Middlware/errorHandler');


let loginRouter = require('./routes/login');
let signupRouter = require('./routes/signup');
let forgetPWD =  require('./routes/forgetPWD');
const {AppError} = require('./Utils/appError');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/auth/login',loginRouter);
app.use('/auth/signup',signupRouter);
app.use('/auth/forgetPassword',forgetPWD);

// error handler
app.use('*',catchAsync(function(err, req, res, next) {
  // set locals, only providing error in development
  throw new AppError('Route don\'t exist on this server',400);
}));
app.use(globalErrorHandler);

module.exports = app;
