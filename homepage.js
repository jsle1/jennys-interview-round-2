// Populating the map
const mymap = L.map('weatherMap').setView([50.5,30.5], 2);
const tilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tilesUrl,
{   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
});
tiles.addTo(mymap);
// Added watercolor filter bc it looks pretty
L.tileLayer.provider('Stamen.Watercolor').addTo(mymap);

// Getting the entered name of city
function searchCity() {
  const enteredCity = document.getElementById("cName").value;

  var request = new XMLHttpRequest()
  const getRequest = request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + enteredCity, true);
  request.send();
  request.onload = function() {
    // Begin accessing JSON data here
    const data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      data.forEach(city => {
        // making these global variables 
        cityName = document.createElement('cityName').textContent = city.title;
        weatherId = document.createElement('weatherId').textContent = city.woeid;
        lattLong = document.createElement('lattLong').textContent = city.latt_long; 

        // splits the lattlong strong in order for the marker to take in the data
        splitLattLong = lattLong.split(",");
        makeMarker(splitLattLong);
      })
   } else {
      console.log('You did not enter a city!');
    }
  }
}

function makeMarker(lattLong){
  const marker = L.marker(lattLong).addTo(mymap);
}

