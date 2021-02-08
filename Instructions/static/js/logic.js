const url= 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(url).then(createmarkers);

function createmarkers(response){
  // console.log(Promise)
  // console.log(response)
  var EarthQuakeData= response.features;
  // console.log(EarthQuakeData)
  earth_quakes=[]
  EarthQuakeData.forEach(d=>{
    var coordinates = d.geometry.coordinates;
    var place = d.properties.place;
    var magnitude=d.properties.mag
    // console.log(place)
    let earth_quake= L.marker([coordinates[1],coordinates[0]])
    let status = `<h3>${place}<h3></h3> Magnitude: ${magnitude}<h3>`;
    earth_quake.bindPopup(status);
    earth_quakes.push(earth_quake)
    // console.log(coordinates)
    // var lat = coordinates[1]
    // console.log(lat)
    // var long= coordinates[0]
    
  });
  // return earth_quakes;

    createMap(L.layerGroup(earth_quakes));
};

function createMap(earth_quakes){

var lightmap= L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
  {
    attribution: 
      "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: apikey
});

 var baseMaps={
   'Light Map': lightmap
 };

 var overlayMaps={
   'Earthqauke':earth_quakes
 };

 var map= L.map('map',{
   center: [39.8283, -98.5795],
   zoom: 5,
   layers: [lightmap, earth_quakes]
 });
 L.control
  .layers(baseMaps, overlayMaps,{
    collapsed: false
  })
  .addTo(map);
}
createmarkers();