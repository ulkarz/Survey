/*
File Name : answers.js
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
const { ObjectId } = require('mongoose');
let mongoose = require('mongoose');

// create a model class
let answerModel = mongoose.Schema({
    surveyId: ObjectId,
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey"
    },
    response1: [String],
    response2: [String],
    response3: [String]
}, {
    collection: "answers"
});

module.exports = mongoose.model('Answer', answerModel);