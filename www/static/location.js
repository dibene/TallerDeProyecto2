var map;
var marker;      
var lastLatLng;  //Last combi latitude and longitude
var sec = 15000;
var intervalId = 0;

function initMap() {
  $.ajax({
    url: "/last",
    type: 'get',
    success: function (data, status, jqXHR) {
      var iconBase = '/static/img/'; 
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: data.latitude, lng: data.longitude},
        zoom: 15
      });
    
      marker = new google.maps.Marker({
        position: {lat: data.latitude, lng:  data.longitude},
        icon: iconBase + 'bus_aHy_icon.ico',
        map: map,
        title: 'COMBI I'
      });
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
      lastLatLng = new google.maps.LatLng(data.latitude, data.longitude);
      map.setCenter(lastLatLng);
      marker.setPosition(lastLatLng);
      console.log("SUCCESS");
      console.log("SUCCES TO RETRIEVE DATA Latitude: " + data.latitude);
      console.log("SUCCES TO RETRIEVE DATA Latitude: " + data.longitude);
    },
    error: function (msg, status, jqXHR) {
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
  displayLastLocation();
});