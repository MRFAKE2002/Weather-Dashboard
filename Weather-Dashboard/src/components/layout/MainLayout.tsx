import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ m: 0, py: 4, flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
