//! React
import React from "react";

//! MUI
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

//! Mock Data
import { twoWeekForecast } from "../../data/forecastData";

//! Context
import { useThemeMode } from "../../contexts/ThemeModeContext";

//! Library
import { useTranslation } from "react-i18next";

const ForecastCard: React.FC = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 6,
        height: "321px",
        background: (t) => t.palette.background.paper,
        mt: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            mb: 2,
            fontWeight: 700,
          }}
        >
          {t("dashboard.2weeksForecast")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            px: 1,
            gap: 3,
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {twoWeekForecast.map((day, index) => (
            <Box
              key={index}
              sx={{
                background: mode === "light" ? "#CDD9E0" : "#3F4861",
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "124px",
                height: "220px",
                textAlign: "center",
                borderRadius: 6,
                p: 2,
                mx: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                {t(`day.${day.day}`)}
              </Typography>

              <Box
                sx={{
                  height: "2px",
                  border: "2px solid",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(90deg, rgba(54, 54, 54, 0) 0%, #7E7E7E 48.5%, rgba(54, 54, 54, 0) 100%)",
                  borderWidth: "0 0 2px 0",
                }}
              />

              <Box>
                <img src={day.icon} alt="" width={72} height={72} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                {day.temp}°C
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
