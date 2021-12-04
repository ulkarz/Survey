/*
File Name : survey.js
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

// connect to the Survey Model
let surveyController = require("../Controllers/survey");

// function for guard (only registered users can view pages)
function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Survey List page - READ Operation */
router.get("/", surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add",requireAuth, surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add",requireAuth, surveyController.processAddPage);

/* GET Route for displaying the Respond page - READ Operation */
router.get("/respond/:id", surveyController.displayRespondPage);

/* POST Route for processing the Respond page - UPDATE Operation */
router.post("/respond/:id", surveyController.processRespondPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id",requireAuth, surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id",requireAuth, surveyController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get("/delete/:id",requireAuth, surveyController.performDeletion);

/* GET Route for displaying My Surveys page */
router.get("/mySurveys", requireAuth, surveyController.displayMySurveyList);

/* GET Route for displaying Survey Statistics - READ Operation */
router.get("/report/:id",requireAuth, surveyController.displaySurveyReport );

module.exports = router;
