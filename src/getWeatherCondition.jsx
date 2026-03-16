const getWeatherCondition = (weathercode) => {
  const weatherConditions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    61: "Rain",
    71: "Snow",
  };

  return weatherConditions[weathercode] || "Unknown";
};

export default getWeatherCondition;
