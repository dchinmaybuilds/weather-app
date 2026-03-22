const getWeatherCondition = (weathercode) => {
  const weatherConditions = {
    // Clear
    0: "Clear Sky",

    // Mostly clear / cloudy
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",

    // Fog
    45: "Foggy",
    48: "Icy Fog",

    // Drizzle
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",

    // Freezing drizzle
    56: "Light Freezing Drizzle",
    57: "Heavy Freezing Drizzle",

    // Rain
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",

    // Freezing rain
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",

    // Snow
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    77: "Snow Grains",

    // Rain showers
    80: "Light Showers",
    81: "Showers",
    82: "Heavy Showers",

    // Snow showers
    85: "Light Snow Showers",
    86: "Heavy Snow Showers",

    // Thunderstorm
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Thunderstorm with Heavy Hail",
  };

  return weatherConditions[weathercode] || "Unknown";
};

export default getWeatherCondition;
