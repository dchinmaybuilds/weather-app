const WeatherCard = ({
  city,
  country,
  temp,
  humidity,
  wind,
  feelsLike,
  weatherCondition,
  isLoading,
  setIsLoading,
}) => {
  return (
    <div className="weatherCard">
      <h2>{`${city}, ${country}`}</h2>
      <h1>{`${temp}°C`}</h1>
      <p>{weatherCondition}</p>
      <div className="statsRow">
        <p>{`Humidity - ${humidity}%`}</p>
        <p>{`Wind - ${wind}km/h`}</p>
        <p>{`Feels like - ${feelsLike}°C`}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
