let mongoose = require('mongoose');

// create a model class
let answerModel = mongoose.Schema({
    answer1: String,
    answer2: String,
    answer3: String
}, {
    collection: "answers"
});

module.exports = mongoose.model('Answer', answerModel);