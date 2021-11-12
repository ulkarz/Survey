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
    res.render('contents/add', { title: 'Create Survey' });
});

/* GET Route for processing the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status
    });
    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit page
            res.render('contents/edit', { title: 'Edit Survey', survey: surveyToEdit });
        }
    });
});

/* GET Route for processing the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status
    });

    Survey.updateOne({ _id, id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

});

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
});

module.exports = router;