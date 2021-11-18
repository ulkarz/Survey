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

let indexController = require("../Controllers/index");

/* GET Home page. */
router.get("/", indexController.displayHomePage);

/* GET Home page. */
router.get("/Home", indexController.displayHomePage);

/* GET Route for displaying the Login Page */
router.get("/login", indexController.displayLoginPage);

/* POST Route for processing the Login Page */
router.post("/login", indexController.processingLoginPage);

/* GET Route for displaying the Register Page */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for processing the Register Page */
router.post("/register", indexController.processingRegisterPage);

module.exports = router;
