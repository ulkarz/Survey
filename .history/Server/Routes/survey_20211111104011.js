let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Survey Model
let Survey = require('../Models/survey')