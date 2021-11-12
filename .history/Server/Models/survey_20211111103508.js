let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    owner: String,
    surveyId: Number,
    status: String

}, {
    collection: "surveys"
});