/*
File Name : app.js
Developers:  
Piraveen Udayakumar – 301102696
Yonas Berhane       – 301165447
Kyeongbin Noh       – 301130132
Ulkar Zakaryayeva   – 301107604 
Halim Yoo           – 301155567
Syeda Maria         - 301184173
Date: November 8, 2021
Description: Survey web application that has full CRUD functionality using Express, Node.JS, MongoDB and EJS templating engine.
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('../Routes/index');
let app = express();

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//modules for cors (cross-origin resource sharing)
let cors= require('cors');



//authentication objects 


//module for auth messaging and error management


//module for database setup

let mongoose = require('mongoose');


//connect mongoose to the URI


// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client'))); 
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/',indexRouter);


app.use(cors());



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
    res.render('error', {title: 'Error'});
    //res.render('error');
  });
  
  module.exports = app;
