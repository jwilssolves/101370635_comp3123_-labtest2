// 101370635
// Richard Wilson

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WindIcon from './icons/wind.png';
import ThermometerIcon from './icons/thermometer.png';
import HumidityIcon from './icons/humidity.png';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '715e7bd243782c9e28a60cc96f5fd4f0';
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchData();
  }, [city]);

  const handleSearch = () => {
    setCity(searchCity);
  };

  const WeatherBox = ({ iconCode, icon, description, label, backgroundColor, textColor }) => {
    try {
      const boxStyle = {
        border: '1px solid #008000',
        borderRadius: '10px',
        padding: '15px',
        textAlign: 'center',
        backgroundColor: backgroundColor || 'transparent',
        color: textColor || 'black',
      };

      const headingStyle = {
        color: '#008000',
      };

      return (
        <div style={boxStyle}>
          {iconCode ? (
            <img src={`https://openweathermap.org/img/wn/${iconCode}.png`} alt={`Weather icon: ${description}`} style={{ width: '50px', height: '50px' }} />
          ) : (
            <div style={{ color: 'white' }}>{icon}</div>
          )}
          <p style={{ ...headingStyle, fontSize: '14px', fontWeight: 'bold', margin: '8px 0' }}>{label}</p>
          <p style={{ fontSize: '12px' }}>{description}</p>
        </div>
      );
    } catch (error) {
      console.error('Error rendering WeatherBox:', error);
      return null;
    }
  };

  return (
    <div style={{ background: 'url("https://source.unsplash.com/1600x900/?cloudy-blue-sky")', backgroundSize: 'cover', minHeight: '100vh', padding: '20px', color: 'white' }}>
      {weatherData && (
        <div style={{ background: 'rgba(0, 0, 0, 0.8)', textAlign: 'center', maxWidth: '800px', margin: 'auto', borderRadius: '10px', padding: '20px' }}>
          <h1 style={{ color: '#008000' }}>{city}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', margin: '20px 0' }}>
            <WeatherBox iconCode={weatherData.weather[0].icon} description={weatherData.weather[0].description} label="Main Weather" backgroundColor="black" textColor="white" />
            <WeatherBox iconCode="50d" description={`Mist: ${weatherData.weather[0].main === 'Mist' ? 'Yes' : 'No'}`} label="Mist" backgroundColor="black" textColor="white" />
            <WeatherBox iconCode="03d" description={`Cloudiness: ${weatherData.clouds.all}%`} label="Cloudiness" backgroundColor="black" textColor="white" />
            <WeatherBox icon={<img src={WindIcon} alt="Wind Icon" />} description={`Wind Speed: ${weatherData.wind.speed} m/s`} label="Wind Speed" backgroundColor="beige" />
            <WeatherBox icon={<img src={ThermometerIcon} alt="Temperature Icon" />} description={`Temperature: ${weatherData.main.temp}K`} label="Temperature" backgroundColor="beige" textColor="black" />
            <WeatherBox icon={<img src={HumidityIcon} alt="Humidity Icon" />} description={`Humidity: ${weatherData.main.humidity}%`} label="Humidity" backgroundColor="beige" textColor="black" />
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default WeatherComponent;

















