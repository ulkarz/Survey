/*
File Name : user.js
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


// require modules for the User Model

let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let user = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required",
    },
    /*
        password:
        {
            type:String,
            default: '',
            trim: true,
            required: 'password is required'
        }
        */
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

//configure options for User Model

let options = { missingPasswordError: "Wrong / Missing Password" };

user.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", user);
