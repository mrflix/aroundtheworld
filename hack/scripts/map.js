var data = {
  "trip": [
    {
      "type": "destination",
      "name": "Stockholm",
      "location" : {
        "lat":  59.328930,
        "long": 18.064910
      }
    },
    {
      "type": "destination",
      "name": "Gothenburg",
      "location" : {
        "lat":  57.708870,
        "long": 11.974560
      }
    },
    {
      "type": "destination",
      "name": "Copenhagen",
      "location" : {
        "lat":  55.676097,
        "long": 12.568337
      }
    },
    {
      "type": "destination",
      "name": "Malmö",
      "location" : {
        "lat":  55.604981,
        "long": 13.003822
      }
    },
    {
      "type": "destination",
      "name": "Gotland",
      "location" : {
        "lat":  57.468412,
        "long": 18.486745
      }
    },
    {
      "type": "destination",
      "name": "Stockholm",
      "location" : {
        "lat":  59.328930,
        "long": 18.064910
      }
    }
  ]
};


$(window).ready(function() {
  var center = [data.trip[0].location.lat, data.trip[0].location.long];
  var zoom = 12;

  var map = L.map('map').setView(center, zoom);

  L.tileLayer('http://{s}.tile.cloudmade.com/f34c3e0ee41e49c4a9df3a13fd3e5c6b/85904/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  }).addTo(map);

  
  var lineOptions = {color: '#0f0'};
  var circleOptions = {fillOpacity: 0.9};

  var locations = [];
  var lastPoint;
  for (var i = 0; i < data.trip.length; i++) {
    var location = data.trip[i].location;
    var point = [location.lat, location.long];
    locations.push(point);

    if (lastPoint) {
      var line = L.polyline([lastPoint, point], lineOptions).addTo(map);
    }

    lastPoint = point;
    L.circleMarker(point, circleOptions).addTo(map);
  }

  var bounds = new L.LatLngBounds(locations);
  map.fitBounds(bounds);

});
