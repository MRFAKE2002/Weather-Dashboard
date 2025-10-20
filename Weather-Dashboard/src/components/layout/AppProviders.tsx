//! React
import React from "react";

//! Libraries
import { CacheProvider } from "@emotion/react";

//! Utils
import createEmotionCache from "../../utils/createEmotionCache";

//! MUI
import { ThemeProvider, CssBaseline } from "@mui/material";

//! Theme
import { getTheme } from "../../theme/muiTheme";

//! Context
import {
  ThemeModeProvider,
  useThemeMode,
} from "../../contexts/ThemeModeContext";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { WeatherProvider } from "../../contexts/WeatherContext";

function InnerProviders({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const { lang } = useLanguage();

  const direction = lang === "fa" ? "rtl" : "ltr";
  const cache = React.useMemo(() => createEmotionCache(direction), [direction]);
  const theme = React.useMemo(
    () => getTheme(mode, direction),
    [mode, direction]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeModeProvider>
      <LanguageProvider>
        <WeatherProvider>
          <InnerProviders>{children}</InnerProviders>
        </WeatherProvider>
      </LanguageProvider>
    </ThemeModeProvider>
  );
}

export default AppProviders;
