let locaValue = document.querySelector(".search-bar");
let searchButton = document.querySelector(".search-btn");
let cityName = document.querySelector(".city-name");
let temp = document.querySelector(".temp");
let present = document.querySelector(".date");
const apiKey = "dd5387e349319549d8ef712c4fe0b51a";

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let cityname = locaValue.value.trim();
  if (!cityname) {
    alert("Please enter a city name");
    return;
  }
  getWeather(cityname);
  locaValue.value = "";
});

function getWeather(cityname) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      cityName.innerHTML = data.name;
      temp.innerHTML = `Temperature: ${data.main.temp}°C`;
      present.innerHTML = `Date: ${new Date().toLocaleDateString()}`;
      weatherCondition.innerHTML = `Condition: ${data.weather[0].description}`;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
}
