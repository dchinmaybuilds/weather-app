import { use, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import getWeatherCondition from "./getWeatherCondition";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const setWeatherData = async (lat, lon, city, country) => {
    // Function that fetches weather data from latitude, longitude
    const openmeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,relativehumidity_2m,apparent_temperature,weathercode`;
    const weatherResponse = await axios.get(openmeteoURL);

    // Setting values for all props
    const temp = weatherResponse.data.current.temperature_2m;
    const humidity = weatherResponse.data.current.relativehumidity_2m;
    const wind = weatherResponse.data.current.windspeed_10m;
    const feelsLike = weatherResponse.data.current.apparent_temperature;
    const weathercode = weatherResponse.data.current.weathercode;
    // Getting weather condition from weather code
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
    setIsLoading(false);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    // Using geocoding to get latitude, longitude from city name
    const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`;
    const geoResponse = await axios.get(geocodingURL);
    if (geoResponse.data.results) {
      const lat = geoResponse.data.results[0].latitude;
      const lon = geoResponse.data.results[0].longitude;
      const city = search;
      const country = geoResponse.data.results[0].country;
      setWeatherData(lat, lon, city, country);
      setFetchError(null);
    } else {
      setFetchError(
        "This city doesn't exist!. Maybe try rechecking the spelling.",
      );
      setIsLoading(false);
    }
  };

  const handleLocation = () => {
    setIsLoading(true);
    // navigator.geolocation.getCurrentPosition is JavaScript's in-built API for location access
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Using Reverse Geocoding to get city name from latitude, longitude
      const reverseGeocodingURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const response = await axios.get(reverseGeocodingURL);
      const city = response.data.address.city;
      const country = response.data.address.country;
      setSearch(city);

      // Calling setWeatherData function
      setWeatherData(lat, lon, city, country);
    });
  };

  return (
    <div className="App">
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleLocation={handleLocation}
      />
      {isLoading ? (
        <p className="msg">Loading weather data...</p>
      ) : weather && !fetchError ? (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          humidity={weather.humidity}
          wind={weather.wind}
          feelsLike={weather.feelsLike}
          weatherCondition={weather.weatherCondition}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : fetchError ? (
        <p className="msg">{fetchError}</p>
      ) : (
        <p className="msg">Search a city.</p>
      )}
    </div>
  );
}

export default App;
