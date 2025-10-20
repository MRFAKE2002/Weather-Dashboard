//! React
import { useEffect } from "react";

//! MUI
import { Box, Grid } from "@mui/material";

//! Library
import { useNavigate } from "react-router-dom";

//! Components
import WeatherCard from "../components/dashboard/WeatherCard";
import MonthlyTempChart from "../components/dashboard/MonthlyTempChart";
import ForecastCard from "../components/dashboard/ForecastCard";

function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (!name) navigate("/login");
  }, [navigate]);

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5, lg: 5, xl: 4 }}>
          <WeatherCard />
        </Grid>

        <Grid size={{ xs: 0, md: 1, lg: 1 }} />

        <Grid size={{ xs: 12, md: 6, lg: 6, xl: 7 }}>
          <MonthlyTempChart />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <ForecastCard />
      </Box>
    </Box>
  );
}

export default DashboardPage;
