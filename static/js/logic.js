function createMap(earthquakeLocations) {

  // create leaflet tilelayer for the map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  // create objects for the layers in the legend
  var base = {
    "Light Map": lightmap
  };
  var earthquakeLayer = {
    "Earthquake Locations": earthquakeLocations
  };

  // create map object with zoom and center
  var map = L.map("map-id", {
    center: [40.52, 34.34],
    zoom: 2,
    layers: [lightmap, earthquakeLocations]
  });

  // create layer control for layers above
  L.control.layers(base, earthquakeLayer, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  //function for colorscape
  function getColor(d) {
    return d >= 4 ? '#cc0066' : // if (d >= 4) return color, else…
      d >= 3 ? '#6666ff' :
      d >= 2 ? '#e600ac' :
      d >= 1 ? '#cc66ff' : 
      '#99ddff';
  }

  // pull each earthquake returned from json
  var earthquakes = response.features;

  // create array to hold markers
  var earthquakeMarkers = [];

  // loop through the earthquakes
  for (var index = 0; index < earthquakes.length; index++) {
    var earthquake = earthquakes[index];

    var longitude = earthquake.geometry.coordinates[0];
    var latitude = earthquake.geometry.coordinates[1];
     

    var time = earthquake.properties.time;
    var date = new Date(time)
    var place = earthquake.properties.place;
    var magnitude = earthquake.properties.mag;
    var magType = earthquake.properties.magType;

    // for each earthquake, create a marker that's size/color is based on magnitude, add popup with info
    var earthquakeMarker = L.circleMarker([latitude, longitude], {radius: magnitude*3, color: getColor(magnitude)}, )
      .bindPopup("<h3>Magnitude:" + magnitude + " " + magType + "<br>Location: " + place + "<br>Time: " + date + "</h3>");

    // Add the marker to the array created above
    earthquakeMarkers.push(earthquakeMarker);
  }

  // create a layer  made from the markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakeMarkers));
}


// Perform an API call to the earthquake.usgs API to get most recent earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);
