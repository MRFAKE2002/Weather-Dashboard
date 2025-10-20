import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
  Menu,
  Button,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  Divider,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../../contexts/ThemeModeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { CITIES } from "../../data/cities";
import { useWeather } from "../../contexts/WeatherContext";

const SettingsMenu: React.FC<{
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}> = ({ anchorEl, handleClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { mode, setMode } = useThemeMode();
  const { lang, setLang } = useLanguage();

  const handleModeChange = (newMode: "light" | "dark") => () => {
    setMode(newMode);
  };

  const handleLangChange = (newLang: "en" | "fa") => () => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/");
    handleClose();
  };

  const selectedButtonStyle = (current: string, target: string) => ({
    borderColor: current === target ? "#2196F3" : undefined,
    color: current === target ? "#2196F3" : undefined,
  });

  return (
    <Menu
      id="settings-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      // Key را برای force re-render اضافه کردیم
      key={lang}
      MenuListProps={{
        "aria-labelledby": "settings-button",
      }}
      transformOrigin={{
        horizontal: lang === "fa" ? "right" : "left",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: lang === "fa" ? "right" : "left",
        vertical: "bottom",
      }}
    >
      <Box
        sx={{
          p: 2,
          minWidth: 220,
          direction: lang === "fa" ? "rtl" : "ltr",
        }}
      >
        {/* Theme Mode Selection */}
        <Typography variant="caption" fontWeight="400" fontSize={16} mb={2}>
          {t("header.mode")}
        </Typography>
        <Box
          display="flex"
          mb={2}
          // flexDirection={lang === "fa" ? "row-reverse" : "row"}
        >
          <Button
            variant="outlined"
            onClick={handleModeChange("light")}
            startIcon={lang === "en" ? <LightModeOutlinedIcon /> : undefined}
            endIcon={lang === "fa" ? <LightModeOutlinedIcon /> : undefined}
            sx={{
              ...selectedButtonStyle(mode, "light"),
              gap: 1,
              textTransform: "none",
            }}
            size="medium"
          >
            {t("header.light")}
          </Button>
          <Button
            variant="outlined"
            onClick={handleModeChange("dark")}
            startIcon={lang === "en" ? <DarkModeOutlinedIcon /> : undefined}
            endIcon={lang === "fa" ? <DarkModeOutlinedIcon /> : undefined}
            sx={{
              ...selectedButtonStyle(mode, "dark"),
              gap: 1,
              textTransform: "none",
            }}
            size="medium"
          >
            {t("header.dark")}
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Language Selection */}
        <Typography variant="caption" fontWeight="400" fontSize={16} mb={2}>
          {t("header.language")}
        </Typography>
        <Box
          display="flex"
          mb={2}
          flexDirection={lang === "fa" ? "row-reverse" : "row"}
        >
          <Button
            variant="outlined"
            onClick={handleLangChange("en")}
            sx={{
              ...selectedButtonStyle(lang, "en"),
              textTransform: "none",
            }}
            size="medium"
            fullWidth
          >
            {t("header.En")}
          </Button>
          <Button
            variant="outlined"
            onClick={handleLangChange("fa")}
            sx={{
              ...selectedButtonStyle(lang, "fa"),
              textTransform: "none",
            }}
            size="medium"
            fullWidth
          >
            {t("header.Fa")}
          </Button>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Logout Button */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            p: 0,
            justifyContent: lang === "fa" ? "flex-end" : "flex-start",
          }}
        >
          <Button
            fullWidth
            variant="text"
            startIcon={
              lang === "en" ? (
                <LogoutOutlinedIcon sx={{ fontSize: "17px" }} />
              ) : undefined
            }
            endIcon={
              lang === "fa" ? (
                <LogoutOutlinedIcon
                  sx={{
                    fontSize: "17px",
                    transform:
                      lang === "fa" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              ) : undefined
            }
            onClick={handleLogout}
            sx={{
              justifyContent: lang === "fa" ? "flex-end" : "flex-start",
              gap: 1,
            }}
          >
            {t("header.logout")}
          </Button>
        </MenuItem>
      </Box>
    </Menu>
  );
};

function DashboardHeader() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { fetchWeather, selectedCity } = useWeather();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLocationChange = (e: SelectChangeEvent<string>) => {
    // setSelectedLocation(e.target.value);
    const selectedCityObj = CITIES.find((city) => city.name === e.target.value);
    if (selectedCityObj) {
      fetchWeather(selectedCityObj);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      // تنظیمات RTL/LTR برای AppBar
      sx={{
        pt: "16px",
        direction: lang === "fa" ? "rtl" : "ltr",
      }}
    >
      <Toolbar
        sx={{
          flexDirection: lang === "fa" ? "row-reverse" : "row",
        }}
      >
        {/* Logo and Title - Left/Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            flexDirection: lang === "fa" ? "row-reverse" : "row",
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/HeaderLogo.webp"
            alt="Logo"
            sx={{
              height: 56,
              // marginRight: lang === "en" ? 1 : 0,
              // marginLeft: lang === "fa" ? 1 : 0,
              // display: lang === "en" ? "block" : "block",
            }}
          />
          {/* Title */}
          <Typography
            variant="caption"
            sx={{
              textAlign: lang === "fa" ? "right" : "left",
            }}
          >
            {t("header.title")}
          </Typography>
        </Box>

        {/* Search Location Select */}
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            width: "300px",
            border: "1px solid  #0000003B)",
          }}
        >
          <InputLabel id="location-select-label">
            {t("header.searchYourLocation")}
          </InputLabel>
          <Select
            labelId="location-select-label"
            value={selectedCity.name}
            onChange={handleLocationChange}
            label={t("header.searchYourLocation")}
            sx={{
              textAlign: lang === "fa" ? "end" : "start",
            }}
          >
            {CITIES.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                  {t(`city.${city.name}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Settings Icon */}
        <IconButton
          edge="end"
          aria-label="settings"
          aria-controls="settings-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          id="settings-button"
          sx={{
            borderRadius: "8px",
            border: "1px solid #BBC1C4",
            marginLeft: lang === "fa" ? 1 : 1,
            marginRight: lang === "fa" ? 1 : 1,
          }}
        >
          <SettingsIcon />
        </IconButton>

        <SettingsMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
      </Toolbar>
    </AppBar>
  );
}

export default DashboardHeader;
