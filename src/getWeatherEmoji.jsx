const getWeatherEmoji = (weathercode, hour) => {
  const isDay = hour >= 6 && hour < 19;

  const day = {
    // Clear / Cloudy
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",

    // Fog
    45: "🌫️",
    48: "🌫️",

    // Drizzle
    51: "🌦️",
    53: "🌦️",
    55: "🌧️",

    // Freezing drizzle
    56: "🌧️",
    57: "🌧️",

    // Rain
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",

    // Freezing rain
    66: "🌧️",
    67: "🌧️",

    // Snow
    71: "🌨️",
    73: "🌨️",
    75: "❄️",
    77: "🌨️",

    // Showers
    80: "🌦️",
    81: "🌧️",
    82: "⛈️",

    // Snow showers
    85: "🌨️",
    86: "❄️",

    // Thunderstorm
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };

  const night = {
    // Clear / Cloudy
    0: "🌙",
    1: "🌙",
    2: "☁️",
    3: "☁️",

    // Fog
    45: "🌫️",
    48: "🌫️",

    // Drizzle
    51: "🌦️",
    53: "🌦️",
    55: "🌧️",

    // Freezing drizzle
    56: "🌧️",
    57: "🌧️",

    // Rain
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",

    // Freezing rain
    66: "🌧️",
    67: "🌧️",

    // Snow
    71: "🌨️",
    73: "🌨️",
    75: "❄️",
    77: "🌨️",

    // Showers
    80: "🌦️",
    81: "🌧️",
    82: "⛈️",

    // Snow showers
    85: "🌨️",
    86: "❄️",

    // Thunderstorm
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };

  return (isDay ? day : night)[weathercode] || "🌡️";
};

export default getWeatherEmoji;
