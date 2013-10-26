var data = {
  "options": {
    "transport": ["car", "bike", "train", "foot", "plane", "ship"]
  },
  "trip": {
    "name": "Baltic Sea Tour 2013",
    "description": "During the summer of 2013 two guys cycled around the Baltic Sea. They started in Norrköping, Sweden and also end the trip there. 2 months, 9 countries and 8000 km.",
    "sections": [{
      "type": "destination",
      "location": {
        "name": "Norrköping",
        "lat": 58.587745,
        "long": 16.192421
      },
      "description": "1) Valid passport: CHECK \n2) Application form: CHECK \n3) A photo: CHECK\n4) Invitation letter: CHECK\n5) Copy of the passport: CHECK\n6) Copy of the insurance policy: CHECK\nThere is nothing that can stop us. Appointment at the consulate on Friday at 10am.",
      "gallery": [{
        "url": "/images/dummy/passport.jpg"
      }, {
        "url": "/images/dummy/start.jpg",
        "caption": "Ready to start"
      }]
    }, {
      "type": "journey",
      "from": {
        "name": "Norrköping",
        "lat": 58.587745,
        "long": 16.192421
      },
      "to": {
        "name": "Stockholm",
        "lat": 59.328930,
        "long": 18.064910
      },
      "transport": "bike",
      "description": "Headwind till Nyköping, downwind from there till Stockholm. 2 punctures. Started at 10.45, which was rather late, so we were in Nyköping at 3, and still had 100km before us. Arrived finally 21.15 at Karro. ",
      "gallery": [{
        "caption": "The first puncture just before Nyköping",
        "url": "/images/dummy/tire.jpg"
      }, {
        "caption": "The second puncture",
        "url": "/images/dummy/puncture.jpg"
      }]
    }, {
      "type": "destination",
      "location": {
        "name": "Stockholm",
        "lat": 59.328930,
        "long": 18.064910
      },
      "description": "Beautiful city. All those nice islands. The gammal stan is great to visit – reminded me of Venice.",
      "gallery": []
    }]
  }
};


$(window).ready(function() {

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

  var sections = data.trip.sections;
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];

    var inactive;
    var active;
    var highlight;
    
    if (section.type === 'destination') {
      var location = section.location;
      var point = [location.lat, location.long];
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
  $('#next').click(function(){
    if (highlightIndex >= 0) {
      map.removeLayer(highlights[highlightIndex]);
      map.addLayer(actives[highlightIndex]);
    }

    highlightIndex++;

    // map.removeLayer(inactives[highlightIndex]);
    map.addLayer(highlights[highlightIndex]);
  });

});
