// Populating the map
mymap = L.map('weatherMap').setView([40.0,-100.1], 3);
const tilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tilesUrl,
{   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
});
tiles.addTo(mymap);
// Added watercolor filter bc it looks pretty
L.tileLayer.provider('Stamen.Watercolor').addTo(mymap);

// Getting the entered name of city
function searchCity() {
  enteredCity = document.getElementById("cName").value;

  var request = new XMLHttpRequest()
  const getRequest = request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + enteredCity, true);
  request.send();
  request.onload = function() {
    // Begin accessing JSON data here
    const data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      data.forEach(city => {
        // making these global variables 
        city_name = document.createElement('city_name').textContent = city.title;
        weather_id = document.createElement('weather_id').textContent = city.woeid;
        latt_long = document.createElement('latt_long').textContent = city.latt_long; 

        // allow city name to be called in HTML
        document.getElementById('city_name').innerHTML = city_name;

        // splits the lattlong strong in order for the marker to take in the data
        splitLattLong = latt_long.split(",");
        makeMarker(splitLattLong);

        // getting weather function
        getWeather();
      })
   } else {
      console.log('You did not enter a city!');
    }
  }
}

// Getting Weather of City
function getWeather() {
  var request = new XMLHttpRequest()
  const getRequest = request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + weather_id, true);
  request.send();
  request.onload = function() {
    // Begin accessing JSON data here
    const data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      data.consolidated_weather.forEach(city => {
        weather_state_name = document.createElement('weather_state_name').textContent = city.weather_state_name,
        applicable_date = document.createElement('applicable_date').textContent = city.applicable_date,
        min_temp = document.createElement('min_temp').textContent = city.min_temp,
        max_temp = document.createElement('max_temp').textContent = city.max_temp,
        the_temp = document.createElement('the_temp').textContent = city.the_temp,
        wind_direction_compass = document.createElement('wind_direction_compass').textContent = city.wind_direction_compass,
        wind_speed = document.createElement('wind_speed').textContent = city.wind_speed,
        humidity = document.createElement('humidity').textContent = city.humidity,
        visibility = document.createElement('visibility').textContent = city.visibility,

        // allow city name to be called in HTML
        document.getElementById('weather_state_name').innerHTML = weather_state_name;
        document.getElementById('applicable_date').innerHTML = applicable_date;
        document.getElementById('min_temp').innerHTML = Math.round(min_temp) + " &#8451";
        document.getElementById('max_temp').innerHTML = Math.round(max_temp) + " &#8451";
        document.getElementById('the_temp').innerHTML = Math.round(the_temp) + " &#8451";

        // not used yet
        /*document.getElementById('wind_direction_compass').innerHTML = wind_direction_compass;
        document.getElementById('wind_speed').innerHTML = wind_speed;
        document.getElementById('humidity').innerHTML = humidity;
        document.getElementById('visibility').innerHTML = visibility;*/

      })
   } else {
      console.log('Weather is not found!');
    }
  }
}

function makeMarker(lattLong){
  const marker = L.marker(lattLong).addTo(mymap);
}

