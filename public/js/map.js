var map = L.map('map');

L.tileLayer('http://{s}.tile.cloudmade.com/f34c3e0ee41e49c4a9df3a13fd3e5c6b/85904/256/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(map);

var circleInactiveOptions = {color:'#444', fillOpacity: 0.8};
var circleActiveOptions = {fillOpacity: 0.8};
var lineInactiveOptions = {color: '#000', opacity: 0.21, weight: 5};
var lineActiveOptions = {opacity: 0.8, weight: 2};
var lineHighlightOptions = {weight: 8};

var points = [];
var inactives = [];
var actives = [];
var highlights = [];

for (var i = 0; i < sections.length; i++) {
  var section = sections[i];

  var inactive;
  var active;
  var highlight;
  
  if (section.type === 'destination') {
    var loc = section.location;
    var point = [loc.lat, loc.long];
    points.push(point);

    inactive = L.circleMarker(point, circleInactiveOptions).setRadius(8);
    active = L.circleMarker(point, circleActiveOptions).setRadius(8);
    highlight = L.circleMarker(point).setRadius(15);
  }

  if (section.type === 'journey') {
    var startPoint = [section.from.lat, section.from.long];
    var endPoint = [section.to.lat, section.to.long];

    inactive = L.polyline([startPoint, endPoint], lineInactiveOptions);
    active = L.polyline([startPoint, endPoint], lineActiveOptions);
    highlight = L.polyline([startPoint, endPoint], lineHighlightOptions);
  }
  
  inactives.push(inactive);
  actives.push(active);
  highlights.push(highlight);

  inactive.addTo(map);
}

var bounds = new L.LatLngBounds(points);
map.fitBounds(bounds);

var highlightIndex = -1;
// $('#next').click(function(){
//   if (highlightIndex >= 0) {
//     map.removeLayer(highlights[highlightIndex]);
//     map.addLayer(actives[highlightIndex]);
//   }

//   highlightIndex++;

//   // map.removeLayer(inactives[highlightIndex]);
//   map.addLayer(highlights[highlightIndex]);
// });