import { useRef, useEffect, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import getWeatherCondition from "./getWeatherCondition";
import getWeatherEmoji from "./getWeatherEmoji";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const debouncedValue = useDebounce(search, 100);
  const skipFetch = useRef(false);

  // useEffect to fetch suggestions whenever debounced value changes
  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }
    if (debouncedValue === "") {
      setSuggestions([]);
      // if input is cleared or blank, clear all suggestions
      return;
    }
    const fetchSuggestions = async () => {
      const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedValue}&count=5`;
      const response = await axios.get(URL);
      setSuggestions(response.data.results || []);
    };

    fetchSuggestions();
  }, [debouncedValue]);

  // function to handle click for a suggestion
  const handleSuggestionClick = (suggestion) => {
    const { latitude, longitude, name, admin1, country } = suggestion;
    setWeatherData(latitude, longitude, name, admin1, country);
    skipFetch.current = true;
    setSearch(name);
    setSuggestions([]);
  };

  const setWeatherData = async (lat, lon, city, state, country) => {
    // Function that fetches weather data from latitude, longitude
    const openmeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current=temperature_2m,windspeed_10m,relativehumidity_2m,apparent_temperature,weathercode`;
    const weatherResponse = await axios.get(openmeteoURL);

    // Setting values for all props
    const hour = parseInt(weatherResponse.data.current.time.slice(11, 13));
    // Hour is the 12th and 13th character of the current.time
    const temp = weatherResponse.data.current.temperature_2m;
    const humidity = weatherResponse.data.current.relativehumidity_2m;
    const wind = weatherResponse.data.current.windspeed_10m;
    const feelsLike = weatherResponse.data.current.apparent_temperature;
    const weathercode = weatherResponse.data.current.weathercode;
    // Getting weather condition from weather code
    const weatherCondition = getWeatherCondition(weathercode);
    const weatherEmoji = getWeatherEmoji(weathercode, hour);
    setWeather({
      city,
      state,
      country,
      hour,
      temp,
      humidity,
      wind,
      feelsLike,
      weatherCondition,
      weatherEmoji,
    });
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (search === "") {
      setFetchError("Please select a city.");
    } else {
      setIsLoading(true);
      // Using geocoding to get latitude, longitude from city name
      const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`;
      const geoResponse = await axios.get(geocodingURL);
      console.log(geoResponse.data);
      if (geoResponse.data.results) {
        const lat = geoResponse.data.results[0].latitude;
        const lon = geoResponse.data.results[0].longitude;
        const city = search;
        const state = geoResponse.data.results[0].admin1;
        const country = geoResponse.data.results[0].country;
        setWeatherData(lat, lon, city, state, country);
        setFetchError(null);
      } else {
        setFetchError(
          "This city doesn't exist!. Maybe try rechecking the spelling.",
        );
        setIsLoading(false);
      }
    }
  };

  const handleLocation = () => {
    setFetchError(null);
    // navigator.geolocation.getCurrentPosition is JavaScript's in-built API for location access
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setIsLoading(true);

        // Using Reverse Geocoding to get city name from latitude, longitude
        const reverseGeocodingURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const response = await axios.get(reverseGeocodingURL);
        const city = response.data.address.city;
        const state = response.data.address.state;
        const country = response.data.address.country;
        skipFetch.current = true;
        setSearch(city);

        // Calling setWeatherData function
        setWeatherData(lat, lon, city, state, country);
      },
      (error) => {
        setIsLoading(false);
        setFetchError(
          "Location access denied. Please allow it to use this feature.",
        );
      },
    );
  };

  return (
    <div className="App">
      <Header />
      <SearchBar
        search={search}
        setSearch={setSearch}
        suggestions={suggestions}
        handleSearch={handleSearch}
        handleLocation={handleLocation}
        handleSuggestionClick={handleSuggestionClick}
      />
      {isLoading ? (
        <p className="msg">Loading weather data...</p>
      ) : weather && !fetchError ? (
        <WeatherCard
          city={weather.city}
          state={weather.state}
          country={weather.country}
          hour={weather.hour}
          temp={weather.temp}
          humidity={weather.humidity}
          wind={weather.wind}
          feelsLike={weather.feelsLike}
          weatherCondition={weather.weatherCondition}
          weatherEmoji={weather.weatherEmoji}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : fetchError ? (
        <p className="msg">{fetchError}</p>
      ) : (
        suggestions.length === 0 && <p className="msg">Search a city.</p>
      )}
    </div>
  );
}

export default App;
