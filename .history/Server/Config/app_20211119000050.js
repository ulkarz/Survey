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

<<<<<<< HEAD
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// database setup
let mongoose = require("mongoose");
let DB = require("./db");
=======
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// database setup
let mongoose = require('mongoose');
let DB = require('./db');
>>>>>>> 6bc8ac1ce254be855e00643619a106f3ee159a49

// point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

<<<<<<< HEAD
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

let indexRouter = require("../Routes/index");
let surveysRouter = require("../Routes/survey");
=======

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB...');
});

let indexRouter = require('../Routes/index');
let surveysRouter = require('../Routes/survey');
>>>>>>> 6bc8ac1ce254be855e00643619a106f3ee159a49

let app = express();

//modules for authentication
<<<<<<< HEAD
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

//modules for cors (cross-origin resource sharing)
let cors = require("cors");

//authentication objects

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);
// initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

//create a User Model Instance
let userModel = require("../Models/user");
let User = userModel.User;

//implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
=======
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//modules for cors (cross-origin resource sharing)
let cors = require('cors');

//authentication objects 

>>>>>>> 6bc8ac1ce254be855e00643619a106f3ee159a49

//module for auth messaging and error management

// view engine setup
<<<<<<< HEAD
app.set("views", path.join(__dirname, "../Views"));
app.set("view engine", "ejs"); // express -e

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Client")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

app.use("/", indexRouter);
app.use("/survey-list", surveysRouter);
=======
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/survey-list', surveysRouter);

>>>>>>> 6bc8ac1ce254be855e00643619a106f3ee159a49

app.use(cors());

// catch 404 and forward to error handler
<<<<<<< HEAD
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
  //res.render('error');
});

module.exports = app;
=======
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
    res.render('error', { title: 'Error' });
    //res.render('error');
});

module.exports = app;
>>>>>>> 6bc8ac1ce254be855e00643619a106f3ee159a49
