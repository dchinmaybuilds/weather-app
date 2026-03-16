import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import getWeatherCondition from "./getWeatherCondition";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`;
    const geoResponse = await axios.get(geocodingURL);
    const lat = geoResponse.data.results[0].latitude;
    const lon = geoResponse.data.results[0].longitude;
    const city = geoResponse.data.results[0].name;
    const country = geoResponse.data.results[0].country;

    const openmeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,relativehumidity_2m,apparent_temperature,weathercode`;
    const weatherResponse = await axios.get(openmeteoURL);

    const temp = weatherResponse.data.current.temperature_2m;
    const humidity = weatherResponse.data.current.relativehumidity_2m;
    const wind = weatherResponse.data.current.windspeed_10m;
    const feelsLike = weatherResponse.data.current.apparent_temperature;
    const weathercode = weatherResponse.data.current.weathercode;

    const weatherCondition = getWeatherCondition(weathercode);
    setWeather({
      city,
      country,
      temp,
      humidity,
      wind,
      feelsLike,
      weatherCondition,
    });
    console.log(weatherCondition);
  };

  const handleLocation = () => {};

  return (
    <div className="App">
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleLocation={handleLocation}
      />
      {weather ? (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          humidity={weather.humidity}
          wind={weather.wind}
          feelsLike={weather.feelsLike}
          weatherCondition={weather.weatherCondition}
        />
      ) : (
        <p className="msg">Search a city to get weather data.</p>
      )}
    </div>
  );
}

export default App;
