var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.542194, lng: -5.676875},
    zoom: 13
});
var marker = new google.maps.Marker({
    position: {lat: 43.542194, lng: -5.676875},
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
    sendRequest();
  });