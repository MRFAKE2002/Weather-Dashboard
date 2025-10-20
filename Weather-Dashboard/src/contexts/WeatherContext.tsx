//! React
import React, { createContext, useState, useContext, useEffect } from "react";

//! Libraries
import axios from "axios";

//! Data
import { CITIES, type City } from "../data/cities";

//! Utils
import { useLocalStorageState } from "../utils/useLocalStorageState";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  highTemp: number;
  lowTemp: number;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  selectedCity: City;
  fetchWeather: (city: City) => void;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  loading: false,
  error: null,
  selectedCity: CITIES[0],
  fetchWeather: () => {},
});

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useLocalStorageState<City>(
    "selected-city",
    CITIES[0]
  );

  const fetchWeather = async (city: City) => {
    setLoading(true);
    setSelectedCity(city);
    setError(null);

    try {
      const apiKey = "d84445b3d4d4dff8239bd8d6ee489b77";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`
      );

      console.log(response.data);

      const data = response.data;

      const formattedData: WeatherData = {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        highTemp: Math.round(data.main.temp_max),
        lowTemp: Math.round(data.main.temp_min),
      };

      setWeatherData(formattedData);
    } catch (err) {
      console.log(err);

      setError("Failed to fetch weather data");

      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        selectedCity,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
