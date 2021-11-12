"use strict";
/*
* File Name : app.ts
* Developers:  Piraveen Udayakumar– 301102696, Yonas Berhane – 301165447,
Kyeongbin Noh – 301130132, Ulkar Zakaryayeva – 301107604, Halim Yoo – 301155567,
Syeda Maria - 301184173
* Date: November 8, 2021
* Description: Survey web application that has full CRUD functionality using Express, Node.JS, MongoDB and EJS templating engine.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// *********** authentication modules needed for Part 3 ************
// modules for cors
const cors_1 = __importDefault(require("cors"));
// ************ authentication objects needed for Part 3 ************
// module for auth messaging and error management
const connect_flash_1 = __importDefault(require("connect-flash"));
const app = (0, express_1.default)();
exports.default = app;
// ********* Need DB Configuration for Part 2 ********************
// view engine setup using ejs templating 
app.set('views', path_1.default.join(__dirname, '../Views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../Client')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../node_modules')));
//add support for cors
app.use((0, cors_1.default)());
//setup express session
//initialize flash
app.use((0, connect_flash_1.default)());
//************initialize passport needed for part 3 ************
// ************ create routing through event handling needed for part 2 ************
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//module.exports = app;
//# sourceMappingURL=app.js.map