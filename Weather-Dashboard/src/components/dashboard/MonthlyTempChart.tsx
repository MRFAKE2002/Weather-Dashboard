//! React
import React, { useMemo } from "react";

//! MUI
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

//! Chart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//! Context
import { useWeather } from "../../contexts/WeatherContext";

//! Library
import { useTranslation } from "react-i18next";

//! Mock Data
const monthlyData: Record<string, { month: string; temp: number }[]> = {
  Tehran: [
    { month: "Jan", temp: 20 },
    { month: "Feb", temp: 10 },
    { month: "Mar", temp: 18 },
    { month: "Apr", temp: 30 },
    { month: "May", temp: 15 },
    { month: "Jun", temp: 33 },
    { month: "Jul", temp: 36 },
    { month: "Aug", temp: 35 },
    { month: "Sep", temp: 30 },
    { month: "Oct", temp: 22 },
    { month: "Nov", temp: 14 },
    { month: "Dec", temp: 17 },
  ],
  "San Francisco": [
    { month: "Jan", temp: 12 },
    { month: "Feb", temp: 14 },
    { month: "Mar", temp: 15 },
    { month: "Apr", temp: 16 },
    { month: "May", temp: 18 },
    { month: "Jun", temp: 20 },
    { month: "Jul", temp: 22 },
    { month: "Aug", temp: 22 },
    { month: "Sep", temp: 21 },
    { month: "Oct", temp: 19 },
    { month: "Nov", temp: 16 },
    { month: "Dec", temp: 13 },
  ],
};

export const generateMonthlyTemperatures = (city: string) => {
  return monthlyData[city] || monthlyData["Tehran"];
};

const MonthlyTemperatureChart: React.FC = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { selectedCity } = useWeather();

  const cityName =
    (selectedCity && (selectedCity.name ?? (selectedCity as any))) || "Tehran";
  const monthlyTemperatures = generateMonthlyTemperatures(cityName);

  const isFa = (i18n.language || "en").startsWith("fa");

  // اگر فارسی است، داده را معکوس کن تا از راست به چپ نمایش داده شود
  const chartData = useMemo(
    () => (isFa ? monthlyTemperatures.slice().reverse() : monthlyTemperatures),
    [monthlyTemperatures, isFa]
  );

  const chartMargin = isFa
    ? { top: 10, right: 0, left: 20, bottom: 10 }
    : { top: 10, right: 20, left: 0, bottom: 10 };

  return (
    <Card
      sx={{
        background: (t) => t.palette.background.paper,
        width: "100%",
        height: "240px",
        borderRadius: 6,
        padding: 1,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: (t) => t.palette.primary.main,
            mb: 2,
            fontWeight: 700,
          }}
        >
          {t("dashboard.averageMonthlyTemperature")}
        </Typography>

        <Box sx={{ width: "100%", height: 160, minHeight: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={chartMargin}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="2.33%" stopColor="rgba(76, 223, 232, 0.8)" />
                  <stop offset="99.97%" stopColor="rgba(121, 71, 247, 0.8)" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke={theme.palette.divider}
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                padding={{ left: isFa ? 10 : 10, right: isFa ? 50 : 20 }}
                tick={{
                  fill: theme.palette.text.primary,
                  textAnchor: isFa ? "end" : "start",
                }}
                tickFormatter={(value) => t(`month.${value.toLowerCase()}`)}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                padding={{ bottom: 10 }}
                ticks={[10, 20, 30, 40]}
                tick={{ fill: theme.palette.text.primary }}
                orientation={isFa ? "right" : "left"}
              />

              <Tooltip
                wrapperStyle={{
                  background: theme.palette.background.default,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                }}
                contentStyle={{ borderRadius: 6 }}
              />

              <Line
                type="linear"
                dataKey="temp"
                stroke="url(#gradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
                strokeLinecap="round"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyTemperatureChart;
