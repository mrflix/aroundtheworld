var map = L.map('map');

L.tileLayer('http://{s}.tile.cloudmade.com/f34c3e0ee41e49c4a9df3a13fd3e5c6b/85904/256/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(map);

var circleInactiveOptions = {color:'#6b92a3', opacity: 0, fillOpacity: 0.5};
var circleActiveOptions = {color:'#3782a3', opacity: 0, fillOpacity: 0.8};

var lineInactiveOptions = {color: '#6b92a3', opacity: 0.5, weight: 5};
var lineActiveOptions = {color:'#3782a3', opacity: 0.8, weight: 8};
var lineHighlightOptions = {color:'#FA0', opacity: 1, weight: 8};

var points = [];
var inactives = [];
var actives = [];
var highlights = [];

for (var i = 0; i < trip.sections.length; i++) {
  addSectionToMap(trip.sections[i]); 
}

function addSectionToMap(section, shouldRefresh){
  var inactive;
  var active;
  var highlight;
  
  if (section.type === 'destination') {
    var loc = section.location;
    var point = [loc.lat, loc.lng];
    points.push(point);

    inactive = L.circleMarker(point, circleInactiveOptions).setRadius(8);
    active = L.circleMarker(point, circleActiveOptions).setRadius(8);
    highlight = L.layerGroup([
      L.circleMarker(point, {color:'#FA0', opacity: 0, fillOpacity: 1}).setRadius(8),
      L.circleMarker(point, {color:'#FA0', fill: '#3782a3', opacity: 1, fillOpacity: 0.3}).setRadius(15)
    ]);

  }

  if (section.type === 'journey') {
    var startPoint = [section.from.lat, section.from.lng];
    var endPoint = [section.to.lat, section.to.lng];

    inactive = L.polyline([startPoint, endPoint], lineInactiveOptions);
    active = L.polyline([startPoint, endPoint], lineActiveOptions);
    highlight = L.polyline([startPoint, endPoint], lineHighlightOptions);
  }
  
  inactives.push(inactive);
  actives.push(active);
  highlights.push(highlight);

  inactive.addTo(map);

  if(shouldRefresh)
    fitMap()
}

function fitMap(){
  var bounds = new L.LatLngBounds(points);
  map.fitBounds(bounds, { padding: [21, 21] });
}

fitMap();