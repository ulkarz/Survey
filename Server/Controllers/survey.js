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

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../Models/survey');
let Answer = require('../Models/answers');
let user = require('../Models/user');

//Displays all Surveys 
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);


        } else {

            let currentDate = new Date();
            //console.log(surveyList);
            res.render('contents/surveyList', {
                title: 'Survey List',
                SurveyList: surveyList,
                messages: req.flash('surveyInactive'),
                responseSaved: req.flash('responseSaved'),
                displayName: req.user ? req.user.displayName : '',
                today: currentDate
            });

        }

    });
}

// Displays ONLY Surveys created by the Survey Owner (Renders to the new MySurveys page)

module.exports.displayMySurveyList = (req, res, next) => {

    // find surveys associated with the same user id created in the Users collection
    Survey.find({ user: req.user }, (err, mySurveys) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(mySurveys);
            res.render('contents/mySurveys', { title: 'My Survey List', user: req.user, owner: user, MySurveys: mySurveys, displayName: req.user ? req.user.displayName : '' });
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
        user: req.user,
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
        "q3ans4": req.body.q3ans4,
        "q4": req.body.q4,
        "q5": req.body.q5
    });
    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list/mySurveys');
        }
    });
}


module.exports.displayRespondPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToRespond) => {

        if (surveyToRespond.endDate < Date.now() || surveyToRespond.startDate > Date.now()) {

            req.flash('surveyInactive', 'Survey Unavailable! Please choose another survey that is active.');

            res.redirect('/survey-list/');
        } else {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                // show the edit page
                res.render('contents/respond', { title: 'Take Survey', responseSaved: req.flash('responseSaved'), survey: surveyToRespond });
            }
        }
    });
}

// Mongoose $push function will be used to append our survey responses values to an array. 
// Each response will be added to the array as a string and each survey will have its own array of responses.

module.exports.processRespondPage = (req, res, next) => {
    let id = req.params.id;
    Survey.updateOne({ _id: req.params.id }, {
        $push: {
            response1: [req.body.response1],
            response2: [req.body.response2],
            response3: [req.body.response3],
            response4: [req.body.response4],
            response5: [req.body.response5]
        },

    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            req.flash('responseSaved', 'Your response was saved, Thank You!');
            res.redirect('/survey-list/');
        }
    });
}
module.exports.displaySurveyReport=(req, res, next) => {
   
    let id = req.params.id;
    //5 aggregations to unwind array, group and count each individual responses frequency (rf) from arrays. 
    //Aggregation pipeline operators are used and new data from calculation is merged to collections
    Survey.aggregate([{$unwind: "$response1"},
         //count 
         {$group: {_id: {id: "$_id", response_1: "$response1"}, rf_1: {$sum: 1}}},
         //build array
         {$group: { _id: "$_id.id",response_rf_1: {$push:{response_1: "$_id.response_1", rf1: "$rf_1"}}}},
        // merged the new array with calculated response frequencys into survey collection 
      {$merge:"surveys"}],
      (err,aggregatedData1) => {
          if (err) {
              console.log(err);
              res.end(err);
          }else{
              Survey.aggregate([{$unwind: "$response2"},
      {$group: {_id: {id: "$_id", response_2: "$response2"}, rf_2: {$sum: 1}}},
      {$group: { _id: "$_id.id",response_rf_2: {$push:{response_2: "$_id.response_2", rf2: "$rf_2"}}}},
      {$merge:"surveys"}],
      (err,aggregatedData2) => {
          if (err) {
              console.log(err);
              res.end(err);
          }else{
              Survey.aggregate([{$unwind: "$response3"},
      {$group: {_id: {id: "$_id", response_3: "$response3"}, rf_3: {$sum: 1}}},
      {$group: { _id: "$_id.id",response_rf_3: {$push:{response_3: "$_id.response_3", rf3: "$rf_3"}}}},
      {$merge:"surveys"}],
      (err,aggregatedData3) => {
          if (err) {
              console.log(err);
              res.end(err);
          }else{
              Survey.aggregate([{$unwind: "$response4"},
            {$group: {_id: {id: "$_id", response_4: "$response4"}, rf_4: {$sum: 1}}},
            {$group: { _id: "$_id.id",response_rf_4: {$push:{response_4: "$_id.response_4", rf4: "$rf_4"}}}},
            {$merge:"surveys"}],
            (err,aggregatedData4) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }else{
                    Survey.aggregate([{$unwind: "$response5"},
            {$group: {_id: {id: "$_id", response_5: "$response5"}, rf_5: {$sum: 1}}},
            {$group: { _id: "$_id.id",response_rf_5: {$push:{response_5: "$_id.response_5", rf5: "$rf_5"}}}},
            {$merge:"surveys"}],
            (err,aggregatedData5) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }else{
                  Survey.findById(id, (err, report) => {
                      //report.forEach(report => {
                     // console.log(report);
                  res.render('contents/report', { title: 'Report', Report: report, displayName: req.user ? req.user.displayName : '',});
          });
        }})
    }})}})
  }})
}})}

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
        "q3ans4": req.body.q3ans4,
        "q4": req.body.q4,
        "q5": req.body.q5
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list/mySurveys');
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
            res.redirect('/survey-list/mySurveys');
        }
    });
}