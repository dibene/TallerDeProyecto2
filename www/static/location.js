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