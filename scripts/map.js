var mymap = L.map('mapid').setView([52.372, 4.89], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoieWFiYnkiLCJhIjoiY2szc3RhbGZxMDl1ZDNobzRiOGdlMTdxNCJ9.8o_CuS9mw7IAMoBbH2zvtQ'
}).addTo(mymap);

var toiletLayer = new L.GeoJSON.AJAX("../geojson/OPENBARE_TOILETTEN.json");   
var metrolineLayer = new L.GeoJSON.AJAX("../geojson/TRAMMETRO_LIJNEN_2019.json");
var metrostopLayer = new L.GeoJSON.AJAX("../geojson/TRAMMETRO_PUNTEN_2019.json");

toiletLayer.addTo(mymap);
metrolineLayer.addTo(mymap);
metrostopLayer.addTo(mymap);
