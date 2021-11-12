let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Survey Model
let Survey = require('../Models/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/', (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            // console.log(SurveyList);
            res.render('contents/surveyList', { title: 'Survey List', SurveyList: surveyList });
        }

    });

});

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {

});

/* GET Route for processing the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {

});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {

});

/* GET Route for processing the Edit page - UPDATE Operation */
router.get('edit/:id', (req, res, next) => {

});
/* GET to perform Deletion - DELETE Operation */

module.exports = router;