import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark", direction: "ltr" | "rtl") =>
  createTheme({
    direction,
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#003464" : "#F3F4F7",
      },
      background: {
        default: mode === "light" ? "#F3FAFE" : "#151D32",
        paper: mode === "light" ? "#E1E9EE" : "#292F45",
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#F3FAFE" : "#151D32",
            color: mode === "light" ? "#003464" : "#F3F4F7",
            boxShadow: "0px 4px 15px 0px #00000026",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#000000DE)" : "#F3F3F3)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            color: "#8895A0",
            border: "1px solid #8895A0",
          },
        },
      },
    },
  });
