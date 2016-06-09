// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/backend/all.js'


$(document).ready(function(){
  //set_map('188 Ly Trien', 'Da Nang');
  //initMap();
});




function initMap(company_address,addresses) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 15,
    center: {lat: 16.0711117, lng: 108.2097794}
  });
  directionsDisplay.setMap(map);

  //document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay,company_address,addresses);
  //});
}

function calculateAndDisplayRoute(directionsService, directionsDisplay,company_address,addresses) {
  var waypts = addresses;
  // var checkboxArray = document.getElementById('waypoints');
  // for (var i = 0; i < checkboxArray.length; i++) {
  //   if (checkboxArray.options[i].selected) {
  //     waypts.push({
  //       location: checkboxArray[i].value,
  //       stopover: true
  //     });
  //   }
  // }
  
	//waypts[0]= "{'location' : '188 Ly Trien, Danang, Viet Nam','stopover': true}"; 
	//waypts[1]= "{'location' : '222 Ly Trien, Danang','stopover': true}"; 
  directionsService.route({
    //origin: document.getElementById('start').value,
    //destination: document.getElementById('end').value,
    origin: company_address,
    destination: addresses[addresses.length-1].location,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      // var summaryPanel = document.getElementById('directions-panel');
      // summaryPanel.innerHTML = '';
      // // For each route, display summary information.
      // for (var i = 0; i < route.legs.length; i++) {
      //   var routeSegment = i + 1;
      //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
      //       '</b><br>';
      //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      // }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


function set_map(state, city){
  var mapOptions = {
    center: new google.maps.LatLng(25.687944,-100.309403),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
  mapOptions);

  if(state == ""){
    address = city;
  }else{
    address = state + ',' + city;
  }

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({
    'address':address
  },

  function(result, status){
    if (status == google.maps.GeocoderStatus.OK){
      map.setCenter(result[0].geometry.location);

      var marker = new google.maps.Marker({
        map: map,
        position: result[0].geometry.location
      });
    }else{
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  return false;
}