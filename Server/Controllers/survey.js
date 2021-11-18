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

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../Models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            // console.log(SurveyList);
            res.render('contents/surveyList', { title: 'Survey List', SurveyList: surveyList });
        }

    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contents/add', { title: 'Create Survey' });
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3
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
}

module.exports.displayRespondPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToRespond) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit page
            res.render('contents/respond', { title: 'Take Survey', survey: surveyToRespond });
        }
    });
}

module.exports.processRespondPage = (req, res, next) => {
    let id = req.params.id;
}

module.exports.displayEditPage = (req, res, next) => {
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
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDeletion = (req, res, next) => {
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
}