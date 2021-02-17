// Create the createMap function

// Create the tile layer that will be the background of our map
var  myMap = L.map("map-id", {
    center: [37.09, -95.71],
    zoom: 5
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


//Get Dataset

var baseurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL
d3.json(baseurl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
  
  
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
  
    
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        var color;
        var r = 255;
        var g = Math.floor(255-80*feature.properties.mag);
        var b = Math.floor(255-80*feature.properties.mag);
        color= "rgb("+r+" ,"+g+","+ b+")"
        
        var geojsonMarkerOptions = {
          radius: 4*feature.properties.mag,
          fillColor: color,
          color: "black",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    }).addTo(myMap)
  }
  
 function getColor(d) {
        return d < 1 ? 'rgb(255,255,255)' :
              d < 2  ? 'rgb(255,225,225)' :
              d < 3  ? 'rgb(255,195,195)' :
              d < 4  ? 'rgb(255,165,165)' :
              d < 5  ? 'rgb(255,135,135)' :
              d < 6  ? 'rgb(255,105,105)' :
              d < 7  ? 'rgb(255,75,75)' :
              d < 8  ? 'rgb(255,45,45)' :
              d < 9  ? 'rgb(255,15,15)' :
                          'rgb(255,0,0)';
    }
  
    // Create a legend to display information about our map
var legend = L.control({position: 'bottomright'});
    
    legend.addTo(myMap);
  