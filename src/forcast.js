import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    if (city) {
      axios
        .get(
          `${apiKeys.base}weather?q=${city}&units=metric&APPID=${apiKeys.key}`
        )
        .then((response) => {
          setWeather(response.data);
          setQuery("");
        })
        .catch((error) => {
          console.log(error);
          setWeather({});
          setError({ message: "Not Found", query: city });
        });
    }
  };

  function checkTime(i) {
    return i < 10 ? "0" + i : i; // add zero in front of numbers < 10
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi"); // Default city
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon || "CLEAR_DAY"} // Fallback icon
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather || "Weather"}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="Search"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {weather.main ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility / 1609)} mi{" "}
                  {/* Convert meters to miles */}
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed * 3.6)} Km/h{" "}
                  {/* Convert m/s to Km/h */}
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query ? `${error.query} ${error.message}` : "Loading..."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
