```javascript
// Online Hospital Management System
// Main JavaScript File

console.log("MediCare Hospital Website Loaded Successfully!");

document.addEventListener("DOMContentLoaded", function () {

    const registerButton = document.querySelector(".register-btn");

    if (registerButton) {
        registerButton.addEventListener("click", function () {
            console.log("Registration page opened");
        });
    }

});
```
