var map;
var marker;      
var lastLatLng;  //Last combi latitude and longitude
var sec = 5000;
var intervalId = 0;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.9205233, lng: -57.9881898},
    zoom: 13
});
marker = new google.maps.Marker({
    position: {lat: -34.9205233, lng: -57.9881898},
    map: map,
    title: 'COMBI I'
});

}

function displayLastLocation(){
  $.ajax({
    url: "/last",
    type: 'get',
    success: function (data, status, jqXHR) {
/*      marker = new google.maps.Marker({
      position: {lat: data.latitude, lng: data.longitude},
      map: map,
      title: 'COMBI I'
    });    */
      lastLatLng = new google.maps.LatLng(data.latitude, data.longitude);
      marker.setPosition(lastLatLng);
      console.log("SUCCESS");
      console.log("SUCCES TO RETRIEVE DATA " + data.msg);
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



    /*
    
   // sec = 5000;
   // intervalId=0;
    
    
    function sendRequest(){
        $.ajax({
          url: "/last",
          success: 
            function(data){
                // TODO graficar en el mapa
                $( "#divFooter" ).append("<p>latitude:"+ data.latitude +" , longitude: "+data.longitude+" time: "+data.time+"</p>");
          },
          complete: function() {
            clearInterval(intervalId);
            intervalId = setInterval(sendRequest, sec); 
       }
      });
    };*/