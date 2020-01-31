
// Getting the entered name of city
function searchCity() {
const enteredCity = document.getElementById("cName").value;
console.log(enteredCity);
}

// GET Request of API
var request = new XMLHttpRequest()
const getRequest = request.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=santiago', true)
request.onload = function() {
  // Begin accessing JSON data here
  const data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(city => {
      const city_name = city.title;
      const woe_id = city.woeid;
      const latt_long = city.latt_long;
    })
 } else {
    console.log('error');
  }
const cityName = document.createElement('cityName').textContent = city_name;
const weatherId = document.createElement('weatherId').textContent = woe_id;
const location = document.getElementById('location').textContent = latt_long;

  const lattLongArray = [latt_long]
      marker.setLatLong(lattLongArray);
}
request.send();
