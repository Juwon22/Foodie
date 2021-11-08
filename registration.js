

// bootstrap elements already have validation attached to it 
// this function will give users notification based on what is missing or invalid 
function validateForm() {

    let formErrors = 0;
    
    if (document.forms["formReg"]["fname"].value == "") {
        document.getElementById("fnameInvalid").style.display = "block";
        formErrors++;
    } else {
        document.getElementById("fnameInvalid").style.display = "none";
    }

    if (document.forms["formReg"]["lname"].value == "") {
        document.getElementById("lnameInvalid").style.display = "block";
        formErrors++;
    } else {
        document.getElementById("lnameInvalid").style.display = "none";
    }

    let bday = (document.forms["formReg"]["bday"].value).split("-");
    if (bday[0].toString().length != 4 || bday[1].toString().length != 2 || bday[2].toString().length != 2) {
        document.getElementById("bdayInvalid").style.display = "block";
        formErrors++;
    } else {
        document.getElementById("bdayInvalid").style.display = "none";
    }

    if (!(document.forms["formReg"]["email"].value).includes("@") || !(document.forms["formReg"]["email"].value).includes(".")) {
        document.getElementById("emailInvalid").style.display = "block";
        formErrors++;
    } else {
        document.getElementById("emailInvalid").style.display = "none";
    }

    if (document.forms["formReg"]["password"].value == "") {
        document.getElementById("passwordInvalid").style.display = "block";
        formErrors++;
    } else {
        document.getElementById("passwordInvalid").style.display = "none";
    }

    if (formErrors == 0) {
        document.getElementById("submitted").style.display = "block";
    } else {
        document.getElementById("submitted").style.display = "none";
    }
}