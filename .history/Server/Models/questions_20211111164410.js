let mongoose = require('mongoose');

// create a model class
let questionModel = mongoose.Schema({
    question1: String,
    question2: String,
    question3: String
}, {
    collection: "questions"
});

module.exports = mongoose.model('Question', questionModel);