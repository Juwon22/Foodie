// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
let mapLoc = { lat: 43.26028519568593, lng: -79.91918248465578 };
// Initialize map code collected from the google api open source tutorial page for map sdk 
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapLoc, // currently hardcoded to show the area near mcmaster university
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();
  // Added button to collect geolocation and pan towards user location
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  //Hardcoded markers to show near map
  var marker1 = new google.maps.Marker({
    position: { lat: 43.25744110523284, lng: -79.92901009822207 }, // chose wendys near the campus as an example marker, ideally in part 3 all nearby restaurants are highlighted
    map,
    title: "Wendy's",
    label: labels[labelIndex++ % labels.length]
  });

  marker1.setMap(map);

  var marker2 = new google.maps.Marker({
    position: { lat: 43.26144154612341, lng: -79.907166188592217}, // second example hardcoded 
    map,
    title: "Chung Chun",
    label: labels[labelIndex++ % labels.length]
  });

  marker2.setMap(map);
}

// if errors occured in geolocation 
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


window.onload = function () {
  var url = document.location.href, params = url.split('?')[1].split('&'), data = {}, tmp;

  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
  }

  console.log(data);

  var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location : mapLoc,
                radius : 5500,
                type : [ 'restaurant' ]
            }, callback);

}