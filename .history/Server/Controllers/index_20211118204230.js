/*
File Name : index.js
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

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let DB = require("../Config/db");

//create the User Model instance
let userModel = require("../Models/user");
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
  res.render("contents/home", { title: "Home", displayName: req.user ? req.user.displayName: ''});
};

module.exports.displayLoginPage = (req, res, next) => {
  //check if the user is already logged in
  if (!req.User) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.User ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processingLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, User, info) => {
    // server error??
    if (err) {
      return next(err);
    }
    if (!User) {
      req.flash("loginMessage", "Authenticate Error");
      return res.redirect("/login");
    }
    req.login(User, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/survey-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  //check if the user is not already logged in
  if (!req.User) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.User ? req.User.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processingRegisterPage = (req, res, next) => {
  //instantiate a user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.User ? req.User.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user and authenticate them

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/survey-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
