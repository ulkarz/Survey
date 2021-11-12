let mongoose = require('mongoose');

// create a model class
let answerModel = mongoose.Schema({
    ans1: String,
    ans2: String,
    ans3: String
}, {
    collection: "answers"
});

module.exports = mongoose.model('Answer', answerModel);