import { Routes, Route, Navigate } from "react-router-dom";
import AppProviders from "./components/layout/AppProviders";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./routes/RequireAuth";

export default function App() {
  const userName = localStorage.getItem("name");

  return (
    <AppProviders>
      <Routes>
        {/* There is not Header or Footer for these routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* There is Header and Footer for these routes */}
        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route
            path="/"
            element={
              <Navigate to={userName ? "/dashboard" : "/login"} replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
}
