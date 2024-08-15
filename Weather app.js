const apiKey = "205e74dba213ccb5630c04622e6e74d3";
function convertToCelsius(temp) {
  return (temp - 273.15).toFixed(1);
}

const getLocation = () => {
  const nav = navigator.geolocation;
  const weatherContainer = document.querySelector(".weather-info-container");
  nav.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        let { clouds, coord, main, name, sys, weather, wind, id } = data;
        let { lon, lat } = coord;
        let { temp, temp_min, temp_max, humidity, pressure } = main;
        const countryFlags = `${sys.country.toLowerCase()}`;
        weather.forEach((condition) => {
          let { description, icon } = condition;
          weatherContainer.innerHTML = `
            <div class=weather-icon>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${
            sys.country
          } flag"/>
            </div>
            <div class=weather-content>
            <h2 class=city><a href=https://openweathermap.org/city/${id} target=_blank>${name}, ${
            sys.country
          } </a><img src="http://openweathermap.org/images/flags/${countryFlags}.png"/> ${description}</h2>
            <h3 class=temperature><span>${convertToCelsius(
              temp
            )}°С</span> temperature ranges from ${convertToCelsius(
            temp_min
          )}°С to ${convertToCelsius(temp_max)}°С</h3>
            <h3>Humidity: ${humidity}%, Atmospheric Pressure: ${pressure} hPa</h3>
            <h3>Cloud: ${clouds.all}%</h3>
            <h3>Wind: ${wind.speed}m/s</h3>
            <h3>Geo coords [${lat}, ${lon}]</h3>
            </div>
            `;
        });
      })
      .catch(() => {
        weatherContainer.innerHTML = `<h3>Couldn't fetch data</h3>`;
      });
  });
};
getLocation();
const search = document.querySelector(".search input");
search.addEventListener("change", () => {
  const WeatherInfo = document.querySelector(".weather-info");
  const searchVal = search.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${apiKey}`;
  fetch(apiUrl)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let { clouds, coord, main, name, sys, weather, wind, id } = data;
      let { lon, lat } = coord;
      let { temp, temp_min, temp_max, humidity, pressure } = main;
      const countryFlags = `${sys.country.toLowerCase()}`;
      weather.forEach((condition) => {
        let { description, icon } = condition;
        let weatherContainer = document.createElement("div");
        weatherContainer.className = "weather-info-container";
        weatherContainer.innerHTML = `
            <div class=weather-icon>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${
          sys.country
        } flag"/>
            </div>
            <div class=weather-content>
            <h2 class=city><a href=https://openweathermap.org/city/${id} target=_blank>${name}, ${
          sys.country
        } </a><img src="http://openweathermap.org/images/flags/${countryFlags}.png"/> ${description}</h2>
            <h3 class=temperature><span>${convertToCelsius(
              temp
            )}°С</span> temperature ranges from ${convertToCelsius(
          temp_min
        )}°С to ${convertToCelsius(temp_max)}°С</h3>
            <h3>Humidity: ${humidity}%, Atmospheric Pressure: ${pressure} hPa</h3>
            <h3>Cloud: ${clouds.all}%</h3>
            <h3>Wind: ${wind.speed}m/s</h3>
            <h3>Geo coords [${lat}, ${lon}]</h3>
            </div>
            `;
        WeatherInfo.appendChild(weatherContainer);
        search.value = "";
      });
    })
    .catch(() => {
      alert(
        `Couldn't fetch data.Make sure you have a stable data connection and you typed the right city name`
      );
      search.value = "";
    });
});
