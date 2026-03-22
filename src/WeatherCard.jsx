const WeatherCard = ({
  city,
  state,
  country,
  temp,
  humidity,
  wind,
  feelsLike,
  weatherCondition,
  weatherEmoji,
}) => {
  return (
    <div className="weatherCard">
      <h2 style={{ marginTop: "2rem" }}>{`${city}, ${state}, ${country}`}</h2>
      <h2 className="emoji">{weatherEmoji}</h2>
      <h1>{`${temp}°C`}</h1>
      <p>{weatherCondition}</p>
      {/* <div className="weatherProp">{`Humidity - ${humidity}%`}</div>
        <div className="weatherProp">{`Wind - ${wind}km/h`}</div>
        <div className="weatherProp">{`Feels like - ${feelsLike}°C`}</div> */}
      <table>
        <tbody>
          <tr>
            <td>
              <p className="weatherProp">{`Humidity - ${humidity}%`}</p>
            </td>
            <td>
              <p className="weatherProp">{`Wind - ${wind}km/h`}</p>
            </td>
            <td>
              <p className="weatherProp">{`Feels like - ${feelsLike}°C`}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherCard;
