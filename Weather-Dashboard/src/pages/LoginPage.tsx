//! React
import React, { useState } from "react";

//! MUI
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Container,
} from "@mui/material";

//! Libraries
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//! Context
import { useThemeMode } from "../contexts/ThemeModeContext";
import { useLanguage } from "../contexts/LanguageContext";

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mode } = useThemeMode();
  const { lang, setLang } = useLanguage();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError(t("login.validation_name_required"));
      return;
    }
    localStorage.setItem("name", name.trim());
    navigate("/dashboard");
  };

  const handleLangSelect = (e: SelectChangeEvent<"en" | "fa">) => {
    setLang(e.target.value as "en" | "fa");
  };

  const loginImage =
    mode === "dark" ? "/DarkLoginImage.webp" : "/LightLoginImage.webp";

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Card
          sx={{
            width: { xs: 340, sm: 560, md: 890, lg: 960 },
            display: "flex",
            flexDirection: { xs: "row", md: "row" },
            minHeight: { xs: 300, md: 420, lg: 560 },
            backgroundColor: mode === "dark" ? "#292F45" : "#FFFFFF",
            boxShadow: "0px 4px 8px 0px #00000040",
            borderRadius: "12px",
          }}
        >
          <CardContent
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              p: { xs: 3, md: 6 },
              paddingY: { xs: 3, md: 12 },
              paddingX: { xs: 3, md: 7 },
            }}
          >
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              {/* Title & Input */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 3, sm: 5 },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: mode === "dark" ? "#FFFFFF" : "#050F24",
                  }}
                >
                  {t("login.login")}
                </Typography>
                <TextField
                  label={t("login.namePlaceholder")}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  error={!!error}
                  helperText={error}
                  fullWidth
                  inputProps={{ "aria-label": t("login.namePlaceholder") }}
                />
              </Box>
              {/* Button */}
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  bgcolor: "#2196F3",
                  color: "white",
                  boxShadow: "0px 3px 1px -2px #00000033",
                }}
                size="large"
              >
                {t("login.submit")}
              </Button>
            </Box>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: { xs: "50%", md: "50%" },
              height: { xs: "50%", md: "100%" },
              display: { xs: "none", sm: "block" },
              objectFit: "cover",
            }}
            image={loginImage}
            alt="login image"
          />
        </Card>
        <Box sx={{ width: "220px" }}>
          <FormControl size="small" variant="standard" fullWidth>
            <InputLabel id="lang-select-label">
              {t("login.languageLabel")}
            </InputLabel>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label={t("login.languageLabel")}
              onChange={handleLangSelect}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fa">فارسی</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
