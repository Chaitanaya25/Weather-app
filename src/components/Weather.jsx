import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("London");

  // Function to return proper icon based on weather condition
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear": return clear_icon;
      case "Clouds": return cloud_icon;
      case "Rain": return rain_icon;
      case "Drizzle": return drizzle_icon;
      case "Snow": return snow_icon;
      default: return clear_icon;
    }
  };

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }
      setWeatherData({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        name: data.name,
        icon: getWeatherIcon(data.weather[0].main)
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div>
      <div className='weather'>
        <div className='Seach-bar'>
          <input 
            type="text" 
            placeholder='Search...' 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search(city)}
          />
          <img src={search_icon} alt="search" onClick={() => search(city)} />
        </div>

        {weatherData && (
          <>
            <img src={weatherData.icon} alt="weather icon" className='Weather-icon' />
            <p className='Temperature'>{weatherData.temp}°c</p>
            <p className='Location'>{weatherData.name}</p>
            <div className="Weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.wind} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
