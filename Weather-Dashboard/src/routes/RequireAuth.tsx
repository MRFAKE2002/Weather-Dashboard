import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = localStorage.getItem("name");
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
