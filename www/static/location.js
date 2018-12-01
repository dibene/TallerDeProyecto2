var map;
var marker;      
var lastLatLng;  //Last combi latitude and longitude
var sec = 5000;
var intervalId = 0;
var combiIcon = '/static/img/bus_aHy_icon.ico'

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.926204, lng: -57.9427348},
    zoom: 15
  });

  marker = new google.maps.Marker({
    position: {lat: -34.926204, lng:  -57.9427348},
    icon: combiIcon,
    map: map,
    title: 'COMBI I'
  });
}

function requestFirstChance() {
  $.ajax({
    url: "/last",
    type: 'get',
    success: function (data, status, jqXHR) {
      ; 
    },
    error: function (msg, status, jqXHR) {
      console.log("ERROR");
      console.log("GET LAST LOCATION ERROR --> " + msg);
    },
    complete: function(){
      clearInterval(intervalId);
      intervalId = setInterval(displayLastLocation, sec); 
    }
  });

}

function displayLastLocation(){
  $.ajax({
    url: "/last",
    type: 'get',
    success: function (data, status, jqXHR) {
      if(data.latitude != null && data.longitude != null){
        lastLatLng = new google.maps.LatLng(data.latitude, data.longitude);
        map.setCenter(lastLatLng);
        marker.setPosition(lastLatLng);
        console.log("SUCCESS");
        console.log("SUCCES TO RETRIEVE DATA Latitude: " + data.latitude);
        console.log("SUCCES TO RETRIEVE DATA Latitude: " + data.longitude);
      }
    },
    error: function (msg, status, jqXHR) {
      lastLatLng = new google.maps.LatLng(-34.926204, -57.9427348);
      map.setCenter(lastLatLng);
      marker.setPosition(lastLatLng);
      console.log("DB is Empty");
      console.log("Set Default in: " + "lat: 34.926204, long: -57.9427348");
      console.log("ERROR");
      console.log("GET LAST LOCATION ERROR --> " + msg);
    },
    complete: function(){
      console.log("COMPLETE");
      clearInterval(intervalId);
      intervalId = setInterval(displayLastLocation, sec); 
    }
  });
}

$(document).ready(function(){
  initMap();
  requestFirstChance();
  displayLastLocation();
});