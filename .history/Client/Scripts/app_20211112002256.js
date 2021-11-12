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

// IIFE - Immediately Invoked Function Expression (AKA an anonymous self-executing function)

// IIFE -- Immediately Invoked Function Expression
(function() {

    function Start() {
        console.log("App Started...")

        let deleteButton = document.querySelectorAll('.btn-danger');

        for (button of deleteButton) {
            button.addEventListener('click', (event) => {
                if (!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/survey-list');
                }
            })
        }
    }

    window.addEventListener("load", Start);
})();