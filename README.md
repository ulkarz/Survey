### COMP229-VIProgrammers-Survey-TeamProject
- - -
## DESCRIPTION 
Our project's name is VIProgrammers.
Basically, it's a customer satisfaction survey website. User can create the satisfaction survey, view them, update a survey or delete it.
- - -
## Prerequisite
Please install node_modules for running our application
- - -
## Files

* Server
  * Controllers
   * Index.js
   > Description: Functions of displaying the survey lists on home pg. Also, Login function and Display RegisterPage.


* Server
  * Config
   * App.js 
   > Description: Set up of Database, authentication, express session, view engine

* Server
  * Model
   * Survey.js 
   > Description: Create the model classes
 
 
 * Server
  * Model
   * User.js 
   > Description: require modules for the User Model         
   > Preview: 
   >                        
     ```javascript
     let mongoose = require("mongoose");
     let passportLocalMongoose = require("passport-local-mongoose");

     let user = mongoose.Schema(
       {
         username: {
           type: String,
           default: "",
           trim: true,
           required: "username is required",
         },
         email: {
           type: String,
           default: "",
           trim: true,
           required: "email address is required",
         },
       },
     );
     ```

* Server
  * Model
   * Survey.js 
   > Description: Create the model classes

- - - 

## Team members

NAME|STDUENTID|EMAIL ADDRESS|POSITION
---|---|---|---|
Piraveen Udayakumar|301102696|pudayak1@my.centennialcollege.ca|Generalist Programmer|
Yonas Berhane|301165447|yberhan1@my.centennialcollege.ca|Lead Software Engineer|
Kyeongbin Noh|301130132|knoh1@my.centennialcollege.ca|UI programmer|
Ulkar Zakaryayeva|301107604|uzakarya@my.centennialcollege.ca|Database Programmer|
Halim Yoo|301155567|hyoo19@my.centennialcollege.ca|Project Manager|
Syeda Maria|301184173|smanzoo6@my.centennialcollege.ca|Web Designer|



