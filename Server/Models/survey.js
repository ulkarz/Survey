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
const { ObjectId } = require('mongoose');
let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    owner: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    startDate: Date,
    endDate: Date,
    q1: String,
    q1ans1: String,
    q1ans2: String,
    q1ans3: String,
    q1ans4: String,
    q2: String,
    q2ans1: String,
    q2ans2: String,
    q2ans3: String,
    q2ans4: String,
    q3: String,
    q3ans1: String,
    q3ans2: String,
    q3ans3: String,
    q3ans4: String,
    q4: String,
    q5: String,
    response1: [String],
    response2: [String],
    response3: [String],
    response4: [String],
    response5: [String],
    response_rf_1:[{response_1: String, rf1:Number}],
    response_rf_2:[{response_2: String, rf2:Number}],
    response_rf_3:[{response_3: String, rf3:Number}],
    response_rf_4:[{response_4: String, rf4:Number}],
    response_rf_5:[{response_5: String, rf5:Number}],
}, {
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);