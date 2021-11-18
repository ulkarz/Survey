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

let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    owner: String,
    surveyId: Number,
    status: String,
    q1: String,
    q2: String,
    q3: String
}, {
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);