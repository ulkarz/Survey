let mongoose = require('mongoose');

// create a model class
let answerModel = mongoose.Schema({
    surveyId: Number,
    ans1: String,
    ans2: String,
    ans3: String
}, {
    collection: "answers"
});

module.exports = mongoose.model('answers', answerModel);