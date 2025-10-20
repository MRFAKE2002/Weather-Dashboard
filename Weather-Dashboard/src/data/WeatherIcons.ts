interface WeatherIconMap {
  [key: string]: {
    icon: string;
    description: string;
  };
}

export const WEATHER_ICONS: WeatherIconMap = {
  "01d": { icon: "/clean.webp", description: "Clear" },
  "01n": { icon: "/night.webp", description: "Clear" },
  "02d": { icon: "/cloudy.webp", description: "Cloudy" },
  "02n": { icon: "/cloudy.webp", description: "Cloudy" },
  "03d": { icon: "/cloudy.webp", description: "Cloudy" },
  "03n": { icon: "/cloudy.webp", description: "Cloudy" },
  "04d": { icon: "/cloudy.webp", description: "Cloudy" },
  "04n": { icon: "/cloudy.webp", description: "Cloudy" },
  "09d": { icon: "/rainCloud.webp", description: "Rain" },
  "09n": { icon: "/rainCloud.webp", description: "Rain" },
  "10d": { icon: "/rainCloud.webp", description: "Rain" },
  "10n": { icon: "/rainCloud.webp", description: "Rain" },
  "11d": { icon: "/thunderstorm.webp", description: "Thunderstorm" },
  "11n": { icon: "/thunderstorm.webp", description: "Thunderstorm" },
  "13d": { icon: "/snow.webp", description: "Snow" },
  "13n": { icon: "/snow.webp", description: "Snow" },
  "50d": { icon: "/windy.webp", description: "Mist" },
  "50n": { icon: "/windy.webp", description: "Mist" },
};
