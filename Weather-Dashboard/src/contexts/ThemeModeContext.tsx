import React, { createContext, useContext } from "react";
import { useLocalStorageState } from "../utils/useLocalStorageState";

type ThemeModeCtx = {
  mode: "light" | "dark";
  setMode: (m: "light" | "dark") => void;
  toggle: () => void;
};

const ThemeModeContext = createContext<ThemeModeCtx | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useLocalStorageState<"light" | "dark">(
    "theme-mode",
    "dark"
  );
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx)
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
};
