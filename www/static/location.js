var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.9205233, lng: -57.9881898},
    zoom: 13
});
var marker = new google.maps.Marker({
    position: {lat: -34.9205233, lng: -57.9881898},
    map: map,
    title: 'COMBI I'
});

}

$(document).ready(function(){
    sec = 5000;
    intervalId=0;
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
    };
   // sendRequest();
  });