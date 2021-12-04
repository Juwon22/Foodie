
const parameters = {long: "", lat: "", location: "", keyword: "", rating: ""};
const base_url = window.location.origin;

function searchByDeviceLocation() {
    UserLocation = null;
    // Using Geolocation to collect user coordinates 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, console.log);

    } else {
        var locationCard = document.getElementById("locationCard");
        locationCard.style.display = "none";
        //Browser does not support geolaction
        alert("Please use google chrome or another browser that supports geolocation. Thank you.")
    }
}

// Using Open source api opencagedata to collect formatted address based on coordinates collected from geolocation 
// final version of function seen below for showlocation, this one was used for testing what is possible 
const successfulLookup = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=576079d7875e4c5896f91f2aab2bf5e6`)
        .then(response => UserLocation = response.json())
        .then(showLocation(position)); // Or do whatever you want with the result
};

// filler function used for debugging 
function printSomething() {
    console.log("Something");
}

// Show location function is a more robust version of successfullookup
// builds request url then collects data
const showLocation = position => {
    var api_key = '576079d7875e4c5896f91f2aab2bf5e6';
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    parameters.lat = latitude; 
    parameters.long = longitude;

    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
        + '?'
        + 'key=' + api_key
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1';

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);

    request.onload = function () {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

        if (request.status === 200) {
            // Success!
            var data = JSON.parse(request.responseText);
            // console.log(data);
            userLocation = data.results[0].formatted; // print the location
            // collected formatted address
            var locationCard = document.getElementById("locationCard");
            locationCard.style.display = "block";
            var locationResults = document.getElementById("locationResult");
            // For part 2 we are simply showing the location we are searching near, ideally this would redirect to the results page and collect restaurant data and display it on the map and on the list 
            // in part 3 the address will be passed to the results page and show the location on the map 
            locationResults.innerHTML = "Searching for restaurants near approximate location: \n" + userLocation;

        

        } else if (request.status <= 500) {
            // We reached our target server, but it returned an error

            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);

            var locationCard = document.getElementById("locationCard");
            locationCard.style.display = "none";
        } else {
            console.log("server error");
        }
    };
    // if errors occured in connecting to geolocation or open source api 
    request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
    };

    request.send();  // make the request
}

function searchByParameters() {
    parameters.keyword = document.getElementById("keywordInput").value;
    parameters.location = document.getElementById("locationInput").value;
    
    console.log(parameters);

    url = base_url + "/Applications/XAMPP/xamppfiles/htdocs/Foodie/Foodie/results_sample.html" + "?keyword=" + encodeURIComponent(parameters.keyword) + "&location=" + encodeURIComponent(parameters.location) + "&rating=" + encodeURIComponent(parameters.rating);

    

}

function setRating(rating) {
    parameters.rating = rating;
}

function goToResultsPage() {
    console.log(parameters);

    url = base_url + "/Applications/XAMPP/xamppfiles/htdocs/Foodie/Foodie/results_sample.html" + "?latitude=" + encodeURIComponent(parameters.lat) + "&longitude=" + encodeURIComponent(parameters.long);

   
}