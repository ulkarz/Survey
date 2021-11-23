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
let user = require("../Models/user");

//Displays all Surveys 
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);


        } else {

            let currentDate = new Date();
            // console.log(SurveyList);
            res.render('contents/surveyList', { title: 'Survey List', SurveyList: surveyList, displayName: req.user ? req.user.displayName : '', today: currentDate });

        }

    });
}

// Displays ONLY Surveys created by the Survey Owner (Renders to the new MySurveys page)

module.exports.displayMySurveyList = (req, res, next) => {

    // find surveys associated with the same user id created in the Users collection
    Survey.find({user: req.user},(err, mySurveys) => {
        if (err) {
            return console.error(err);
        } 
        else {
            res.render('contents/mySurveys', { title: 'My Survey List', user: req.user, owner: user, MySurveys: mySurveys, displayName: req.user ? req.user.displayName: '' });
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    res.render('contents/add', { title: 'Create Survey', displayName: req.user ? req.user.displayName : '' });
}

module.exports.processAddPage = (req, res, next) => {
    let currentDate = new Date();

    let newSurvey = Survey({
        "name": req.body.name,
        "owner": req.body.owner,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q1ans1": req.body.q1ans1,
        "q1ans2": req.body.q1ans2,
        "q1ans3": req.body.q1ans3,
        "q1ans4": req.body.q1ans4,
        "q2": req.body.q2,
        "q2ans1": req.body.q2ans1,
        "q2ans2": req.body.q2ans2,
        "q2ans3": req.body.q2ans3,
        "q2ans4": req.body.q2ans4,
        "q3": req.body.q3,
        "q3ans1": req.body.q3ans1,
        "q3ans2": req.body.q3ans2,
        "q3ans3": req.body.q3ans3,
        "q3ans4": req.body.q3ans4
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
            res.render('contents/edit', { title: 'Edit Survey', survey: surveyToEdit, displayName: req.user ? req.user.displayName : '' });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "owner": req.body.owner,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q1ans1": req.body.q1ans1,
        "q1ans2": req.body.q1ans2,
        "q1ans3": req.body.q1ans3,
        "q1ans4": req.body.q1ans4,
        "q2": req.body.q2,
        "q2ans1": req.body.q2ans1,
        "q2ans2": req.body.q2ans2,
        "q2ans3": req.body.q2ans3,
        "q2ans4": req.body.q2ans4,
        "q3": req.body.q3,
        "q3ans1": req.body.q3ans1,
        "q3ans2": req.body.q3ans2,
        "q3ans3": req.body.q3ans3,
        "q3ans4": req.body.q3ans4
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