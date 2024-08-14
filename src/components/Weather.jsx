import React from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import feels_like_icon from "../assets/feels_like.png";
import visibility_icon from "../assets/visibility.png";
import { useEffect, useState, useRef } from "react";

const Weather = () => {
  const inputRef = useRef();
  const searchRef= useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city == "") {
      alert("Please enter your city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      //Fetching the data from API

      const response = await fetch(url);
      const data = await response.json();


      if(!response.ok){
        alert(data.message);
        return;
      }


      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon,

        visibility: data.visibility,
        feels_like: data.main.feels_like
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data:", error);
    }
  };

  //This will be executed when we click enter in our keyboard
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchRef.current.click(); // Trigger the click event on the search icon
    }
  };

  useEffect(() => {
    search("New Delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" ref={inputRef} placeholder="Enter your city name" onKeyUp={handleKeyPress}/>
        <img
          src={search_icon}
          alt="Search icon"
          ref={searchRef}
          onClick={() => search(inputRef.current.value.trim())}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{Math.floor(weatherData.temperature)}<sup>°</sup>C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={feels_like_icon} alt="" />
              <div>
                <p>{Math.floor(weatherData.feels_like)}<sup>°</sup>C</p>
                <span>Feels like</span>
              </div>
            </div>
            <div className="col">
              <img src={visibility_icon} alt="" />
              <div>
                <p>{Math.ceil(weatherData.visibility/1000)} km</p>
                <span>Visibility</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
