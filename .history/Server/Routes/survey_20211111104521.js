let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Survey Model
let Survey = require('../Models/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/', (req, res, next) => {
    Survey.find((err, SurveyList) => {
        if (err) {
            return console.error(err);
        } else {
            console / log(SurveyList);
        }

    });

});