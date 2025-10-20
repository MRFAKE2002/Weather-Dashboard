//! React
import React from "react";

//! MUI
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

//! Libraries
import { useTranslation } from "react-i18next";

//! Context
import { useWeather } from "../../contexts/WeatherContext";
import { useLanguage } from "../../contexts/LanguageContext";

//! Utils
import { WEATHER_ICONS } from "../../data/WeatherIcons";

//! Icon
import LocationOnIcon from "@mui/icons-material/LocationOn";

//! Components
import CityTime from "./CityTime";

const WeatherCard: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const { weatherData, loading, error, selectedCity } = useWeather();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!weatherData) return null;

  const weatherIconInfo = WEATHER_ICONS[weatherData.icon] || {
    icon: "❓",
    description: "Unknown weather",
  };

  return (
    <Card
      sx={{
        background: (theme) => theme.palette.background.paper,
        margin: "auto",
        maxWidth: "100%",
        height: "240px",
        borderRadius: 6,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          {/* Location & Date/Time & Temp */}
          <Box>
            <Box
              gap={2}
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignContent="center"
            >
              {/* Location */}
              <Box
                padding={1}
                gap={1}
                borderRadius={50}
                sx={{
                  background: "#CDD9E0",
                  color: "#3D4852",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <LocationOnIcon />
                <Typography variant="caption" fontWeight="400" fontSize={16}>
                  {t(`city.${selectedCity.name}`)}
                </Typography>
              </Box>
              {/* Date/Time */}
              <CityTime city={selectedCity} />
              {/* <Box>
                <Typography
                  variant="caption"
                  fontWeight={500}
                  fontSize={32}
                  sx={{ color: (theme) => theme.palette.primary.main }}
                >
                  {t(
                    `day.${new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}`
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.primary.main }}
                >
                  {new Date().toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box> */}
              {/* Temp */}
              <Box>
                <Typography
                  variant="h3"
                  fontWeight={500}
                  sx={{ color: (theme) => theme.palette.primary.main }}
                >
                  {weatherData.temperature}°C
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.primary.main }}
                >
                  {t("dashboard.high")}: {weatherData.highTemp}{" "}
                  {t("dashboard.low")}: {weatherData.lowTemp}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Icon & Temp */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            {/* Weather Image */}
            <Box sx={{ width: "137px" }}>
              <img src={weatherIconInfo.icon} alt="" width="100%" />
            </Box>

            <Typography
              variant="h4"
              sx={{ color: (theme) => theme.palette.primary.main, mb: 1 }}
            >
              {t(`weather.${weatherIconInfo.description}`)}
            </Typography>

            <Typography
              variant="caption"
              fontWeight={400}
              fontSize={16}
              sx={{ color: (theme) => theme.palette.primary.main, mb: 2 }}
            >
              {lang === "fa"
                ? `${weatherData.feelsLike}° ${t("dashboard.feelsLike")}`
                : `${t("dashboard.feelsLike")} ${weatherData.feelsLike}°`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
