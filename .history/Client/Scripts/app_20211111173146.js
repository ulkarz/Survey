/* custom js goes here */

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